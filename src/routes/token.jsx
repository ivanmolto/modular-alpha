import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function numberWithCommas(rawNumber) {
  return rawNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getToken(contractAddressHash) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  return fetch(
    `https://explorer.testnet.mantle.xyz/api?module=token&action=getToken&contractaddress=${contractAddressHash}`,
    options
  ).then((response) => response.json());
}

function TokenAddress({ contractAddressHash }) {
  const tokenQuery = useQuery({
    queryKey: ["token", contractAddressHash],
    queryFn: () => getToken(contractAddressHash),
  });

  if (tokenQuery.isLoading)
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Token Details
          </h2>
          <div>
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-3 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>
              Loading token...
            </div>
          </div>
        </div>
      </div>
    );
  if (tokenQuery.isError)
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Token Details
          </h2>
          <div>
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-3 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>
              {`Error! ${error.message}`}
            </div>
          </div>
        </div>
      </div>
    );
  if (tokenQuery.data.result === null) {
    return (
      <div className="bg-gray-50 font-montserrat">
        <div className="mt-1">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Token Details
          </h2>
          <div>
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-3 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>
              Sorry no data available
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    const token = tokenQuery.data.result;
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <main className="flex-1 pb-8">
          <div className="-mt-3 px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <h2 className="font-semibold leading-6 text-lg">Token Details</h2>
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          Name
                        </dt>
                        <dd>
                          <div className="text-md font-medium text-gray-900">
                            {token.name}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden text-ellipsis rounded-lg bg-white shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          Symbol
                        </dt>
                        <dd>
                          <div className="truncate text-md font-medium text-gray-900">
                            {token.symbol}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg bg-white border-1 shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500">
                          Contract
                        </dt>
                        <dd>{token.contractAddress}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-white border-1 shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          Decimals
                        </dt>
                        <dd>{token.decimals}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg bg-white border-1 shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500">
                          Total Supply
                        </dt>
                        <dd>
                          {numberWithCommas(
                            (token.totalSupply / 10 ** 18).toFixed(0)
                          )}{" "}
                          {token.symbol}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-white border-1 shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          Type
                        </dt>
                        <dd>{token.type}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const Token = () => {
  let params = useParams();
  const contractAddressHash = params.tokenId;
  return <TokenAddress contractAddressHash={contractAddressHash} />;
};
export default Token;
