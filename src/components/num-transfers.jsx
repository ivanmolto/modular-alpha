import { useQuery } from "@tanstack/react-query";

function numberWithCommas(rawNumber) {
  var parts = rawNumber.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function getTransfers(addressHash) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  return fetch(
    `https://explorer.testnet.mantle.xyz/api?module=account&action=tokentx&address=${addressHash}&startblock=1&endblock=100000`,
    options
  ).then((response) => response.json());
}

function Transfers({ addressHash }) {
  const transfersQuery = useQuery({
    queryKey: ["transfers", addressHash],
    queryFn: () => getTransfers(addressHash),
  });

  if (transfersQuery.isLoading)
    return (
      <div className="text-sm font-normal">Loading number of transfers...</div>
    );
  if (transfersQuery.isError)
    return (
      <div className="text-sm font-normal">{`Error! ${error.message}`}</div>
    );
  if (transfersQuery.data.result.length === 0)
    return (
      <div className="truncate text-md font-medium text-gray-900">
        No Transfers
      </div>
    );
  if (transfersQuery.data.result.length === 1)
    return (
      <div className="truncate text-md font-medium text-gray-900">
        {transfersQuery.data.result.length} Transfer
      </div>
    );
  if (transfersQuery.data.result.length === 10000)
    return (
      <div className="truncate text-md font-medium text-gray-900">
        {numberWithCommas(transfersQuery.data.result.length)} Transfers{" "}
        <span className="text-xs font-normal">
          (up to a max of 10,0000 txs)
        </span>
      </div>
    );
  return (
    <div className="text-md font-medium text-gray-900">
      {numberWithCommas(transfersQuery.data.result.length)} Transfers
    </div>
  );
}

const NumTransfers = ({ addressHash }) => {
  return <Transfers addressHash={addressHash} />;
};
export default NumTransfers;
