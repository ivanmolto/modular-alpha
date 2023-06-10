import { useQuery } from "@tanstack/react-query";

function numberWithCommas(rawNumber) {
  var parts = rawNumber.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function getNumTokens(addressHash) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  return fetch(
    `https://explorer.testnet.mantle.xyz/api?module=account&action=tokenlist&address=${addressHash}`,
    options
  ).then((response) => response.json());
}

function NumTok({ addressHash }) {
  const numTokenQuery = useQuery({
    queryKey: ["numtokens", addressHash],
    queryFn: () => getNumTokens(addressHash),
  });

  if (numTokenQuery.isLoading)
    return (
      <div className="text-sm font-normal">Loading number of tokens...</div>
    );
  if (numTokenQuery.isError)
    return (
      <div className="text-sm font-normal">{`Error! ${error.message}`}</div>
    );
  return (
    <div className="text-md font-medium text-gray-900">
      <span className="px-1.5 py-0.5 rounded-md bg-mant">
        {numTokenQuery.data.result.length} Tokens
      </span>
    </div>
  );
}

const NumTokens = ({ addressHash }) => {
  return <NumTok addressHash={addressHash} />;
};

export default NumTokens;
