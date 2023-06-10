import { useQuery } from "@tanstack/react-query";

function numberWithCommas(rawNumber) {
  var parts = rawNumber.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function getTransactions(addressHash) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  return fetch(
    `https://explorer.testnet.mantle.xyz/api?module=account&action=txlist&address=${addressHash}&startblock=1&endblock=1000000&page=1&offset=10000`,
    options
  ).then((response) => response.json());
}

function NumTxs({ addressHash }) {
  const txQuery = useQuery({
    queryKey: ["numtxs", addressHash],
    queryFn: () => getTransactions(addressHash),
  });

  if (txQuery.isLoading)
    return (
      <div className="text-sm font-normal">
        Loading number of transactions...
      </div>
    );
  if (txQuery.isError)
    return (
      <div className="text-sm font-normal">{`Error! ${error.message}`}</div>
    );
  if (txQuery.data.result.length === 0) {
    return (
      <div className="truncate text-md font-medium text-gray-900">
        No Transactions
      </div>
    );
  }
  if (txQuery.data.result.length === 1) {
    return (
      <div className="truncate text-md font-medium text-gray-900">
        <span className="px-1.5 py-0.5 rounded-md bg-mant">1 Transaction</span>
      </div>
    );
  }
  if (txQuery.data.result.length === 10000) {
    return (
      <div className="truncate text-md font-medium text-gray-900">
        {numberWithCommas(txQuery.data.result.length)} Transactions{" "}
        <span className="text-xs font-normal">
          (up to a max of 10,0000 txs)
        </span>
      </div>
    );
  }
  return (
    <div className="text-md font-medium text-gray-900">
      <span className="px-1.5 py-0.5 rounded-md bg-mant">
        {numberWithCommas(txQuery.data.result.length)} Transactions
      </span>
    </div>
  );
}

const NumTransactions = ({ addressHash }) => {
  return <NumTxs addressHash={addressHash} />;
};
export default NumTransactions;
