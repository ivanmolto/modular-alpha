import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

function getTableTransactions(addressHash) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  return fetch(
    `https://explorer.testnet.mantle.xyz/api?module=account&action=txlist&address=${addressHash}&startblock=1&endblock=1000000&page=1&offset=10000`,
    options
  ).then((response) => response.json());
}

function st(times) {
  const stamp = new Date(times * 1000).toString();
  return stamp;
}

function DisplayTransactions({ addressHash }) {
  const tableTxQuery = useQuery({
    queryKey: ["tabletxquery", addressHash],
    queryFn: () => getTableTransactions(addressHash),
  });

  if (tableTxQuery.isLoading)
    return <div className="text-sm font-normal">Loading Transactions...</div>;

  if (tableTxQuery.isError)
    return (
      <div className="text-sm font-normal">{`Error! ${error.message}`}</div>
    );

  if (tableTxQuery.data.result.length === 0) return null;
  const transactionsPagination = tableTxQuery.data.result;
  return (
    <>
      <div className="mt-4 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-md font-semibold text-gray-900">Transactions</h1>
        </div>
      </div>
      <div className="shadow sm:hidden">
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
        >
          {transactionsPagination.map((tx) => (
            <li key={tx.hash}>
              <Link
                to={`/transactions/${tx.hash}`}
                className="block bg-white px-4 py-4 hover:bg-gray-50"
              >
                <span className="flex items-center space-x-4">
                  <span className="flex flex-1 space-x-2 truncate">
                    <span className="flex flex-col truncate text-sm text-gray-500">
                      <span className="truncate">
                        From:{" "}
                        <span className="text-blue-500">
                          {tx.from.slice(0, 10)}...
                        </span>
                      </span>
                      <span>
                        <span className="truncate">
                          To:{" "}
                          <span className="text-blue-500">
                            {tx.to.slice(0, 10)}...
                          </span>
                        </span>{" "}
                        Value: {tx.value / 10 ** 18} BIT
                      </span>
                      <div>
                        <span className="truncate">
                          Hash:
                          <span className="text-blue-500">
                            {tx.hash.slice(0, 10)}...
                          </span>{" "}
                          {st(tx.timeStamp).slice(0, 34)}
                        </span>
                      </div>
                    </span>
                  </span>
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 hidden sm:block">
        <div className="-my-2 -mx-6 max-w-6xl lg:-mx-8">
          <div className=" py-2 flex flex-col sm:px-6 lg:px-8">
            <div className=" min-w-full overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="bg-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Tx Hash
                    </th>
                    <th
                      scope="col"
                      className="bg-gray-200 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      From
                    </th>
                    <th
                      scope="col"
                      className="bg-gray-200 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      To
                    </th>
                    <th
                      scope="col"
                      className="bg-gray-200 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Value
                    </th>
                    <th
                      scope="col"
                      className="bg-gray-200 relative py-3.5 pl-3 pr-6 text-left text-sm font-semibold text-gray-900"
                    >
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {transactionsPagination.map((tx) => (
                    <tr key={tx.hash}>
                      <td className="truncate whitespace-nowrap py-4 pl-6 pr-3 text-sm font-sm text-blue-500">
                        <Link to={`/transactions/${tx.hash}`}>
                          {tx.hash.slice(0, 20)}...
                        </Link>
                      </td>
                      <td className="truncate whitespace-nowrap px-3 py-4 text-sm text-blue-500">
                        <Link to={`/accounts/${tx.from}`}>
                          {tx.from.slice(0, 10)}...
                        </Link>
                      </td>
                      <td className="truncate whitespace-nowrap px-3 py-4 text-sm text-blue-500">
                        <Link to={`/accounts/${tx.to}`}>
                          {tx.to.length !== 0 ? tx.to.slice(0, 10) + "..." : ""}
                        </Link>
                      </td>
                      <td className="truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {tx.value / 10 ** 18} BIT
                      </td>
                      <td className="truncate whitespace-nowrap py-4 pl-3 pr-6 text-sm">
                        {st(tx.timeStamp).slice(0, 34)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const TableTransactions = ({ addressHash }) => {
  return <DisplayTransactions addressHash={addressHash} />;
};
export default TableTransactions;
