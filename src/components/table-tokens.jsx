import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

function numberWithCommas(rawNumber) {
  var parts = rawNumber.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function getTableTokens(addressHash) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  return fetch(
    `https://explorer.testnet.mantle.xyz/api?module=account&action=tokenlist&address=${addressHash}`,
    options
  ).then((response) => response.json());
}

function DisplayTokens({ addressHash }) {
  const tableTokensQuery = useQuery({
    queryKey: ["tabletokenquery", addressHash],
    queryFn: () => getTableTokens(addressHash),
  });

  if (tableTokensQuery.isLoading)
    return <div className="text-sm font-normal">Loading Tokens...</div>;

  if (tableTokensQuery.isError)
    return (
      <div className="text-sm font-normal">{`Error! ${error.message}`}</div>
    );

  if (tableTokensQuery.data.result.length === 0) return null;
  const tokensPagination = tableTokensQuery.data.result;
  console.log(tokensPagination);
  return (
    <>
      <div className="mt-4 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-md font-semibold text-gray-900">Tokens</h1>
        </div>
      </div>
      <div className="shadow sm:hidden">
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
        >
          {tokensPagination.map((tok) => (
            <li key={tok.contractAddress}>
              <Link
                to="/"
                className="block bg-white px-4 py-4 hover:bg-gray-50"
              >
                <span className="flex items-center space-x-4">
                  <span className="flex flex-1 space-x-2 truncate">
                    <span className="flex flex-col truncate text-sm text-gray-500">
                      <span className="truncate">Name: {tok.name}</span>
                      <span>
                        <span className="truncate">Type: {tok.type}</span>{" "}
                        Balance:{" "}
                        {numberWithCommas(tok.balance / 10 ** tok.decimals)}
                      </span>
                      <div>
                        <span className="truncate">
                          <span className="text-blue-500">
                            {tok.contractAddress.slice(0, 20)}...
                          </span>
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
                      Asset
                    </th>
                    <th
                      scope="col"
                      className="bg-gray-200 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="bg-gray-200 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="bg-gray-200 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Symbol
                    </th>
                    <th
                      scope="col"
                      className="bg-gray-200 relative py-3.5 pl-3 pr-6 text-left text-sm font-semibold text-gray-900"
                    >
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {tokensPagination.map((tok) => (
                    <tr key={tok.contractAddress}>
                      <td className="truncate whitespace-nowrap py-4 pl-6 pr-3 text-sm font-sm text-gray-500">
                        {tok.name}
                      </td>
                      <td className="truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {tok.type}
                      </td>
                      <td className="truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {numberWithCommas(tok.balance / 10 ** tok.decimals)}
                      </td>
                      <td className="truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {tok.symbol}
                      </td>
                      <td className="truncate whitespace-nowrap py-4 pl-3 pr-6 text-sm text-blue-500 font-medium">
                        <Link to={`/accounts/${tok.contractAddress}`}>
                          {tok.contractAddress.slice(0, 20)}...
                        </Link>
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

const TableTokens = ({ addressHash }) => {
  return <DisplayTokens addressHash={addressHash} />;
};
export default TableTokens;
