import { useQuery } from "@tanstack/react-query";

function numberWithCommas(rawNumber) {
  var parts = rawNumber.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function getPendingTxs(addressHash) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  return fetch(
    `https://explorer.testnet.mantle.xyz/api?module=account&action=pendingtxlist&address=${addressHash}`,
    options
  ).then((response) => response.json());
}

function NumPendingTransactions({ addressHash }) {
  const pendingTxQuery = useQuery({
    queryKey: ["numpendingtxs", addressHash],
    queryFn: () => getPendingTxs(addressHash),
  });

  if (pendingTxQuery.isLoading)
    return (
      <div className="text-sm font-normal">
        Loading pending transactions number...
      </div>
    );
  if (pendingTxQuery.isError)
    return (
      <div className="text-sm font-normal">{`Error! ${error.message}`}</div>
    );
  if (pendingTxQuery.data.result.length === 0)
    return (
      <div className="text-md font-medium text-gray-900">
        No Pending Transactions
      </div>
    );
  if (pendingTxQuery.data.result.length === 1)
    return (
      <div className="text-md font-medium text-gray-900">
        {pendingTxQuery.data.result.length} Pending Transaction
      </div>
    );
  return (
    <div className="text-md font-medium text-gray-900">
      {numberWithCommas(pendingTxQuery.data.result.length)} Pending Transactions
    </div>
  );
}
export default NumPendingTransactions;
