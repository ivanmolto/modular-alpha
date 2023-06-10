import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getSource(addressHash) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  return fetch(
    `https://explorer.testnet.mantle.xyz/api?module=contract&action=getsourcecode&address=${addressHash}`,
    options
  ).then((response) => response.json());
}

function Source({ addressHash }) {
  const sourceQuery = useQuery({
    queryKey: ["source", addressHash],
    queryFn: () => getSource(addressHash),
  });

  if (sourceQuery.isLoading)
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Contract Details
          </h2>
          <div>
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-3 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>
              Loading contract...
            </div>
          </div>
        </div>
      </div>
    );
  if (sourceQuery.isError)
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Contract Details
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
  if (sourceQuery.data.result === null) {
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Contract Details
          </h2>
          <div>
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-3 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>
              Sorry {addressHash} is not a valid contract address
            </div>
          </div>
        </div>
      </div>
    );
  }
  const source = sourceQuery.data.result;
  if (source[0].ABI === undefined) {
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Contract Details
          </h2>
          <div>
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-3 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>
              Sorry the address {addressHash} is not a verified contract
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    const source = sourceQuery.data.result;
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <main className="flex-1 pb-8">
          <div className="-mt-3 px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <h2 className="leading-6 font-semibold text-lg">
              Contract Details
            </h2>
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>
          </div>
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="mt-2 grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2">
              <div className="overflow-hidden text-ellipsis rounded-lg bg-white shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          Contract Name
                        </dt>
                        <dd>
                          <div className="truncate text-md font-medium text-gray-900">
                            {source[0].ContractName}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          Compiler Version
                        </dt>
                        <dd>
                          <div className="text-md font-medium text-gray-900">
                            {source[0].CompilerVersion}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 md:mt-2 grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg bg-white border-1 shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          Address
                        </dt>
                        <dd>
                          <div className="truncate text-md font-medium text-blue-500 hover:underline">
                            <Link to={`/accounts/${addressHash}`}>
                              {addressHash}
                            </Link>
                          </div>
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
                        <dt className="text-sm font-medium text-gray-500">
                          EVM Version
                        </dt>
                        <dd>
                          <div className="text-md font-medium text-gray-900">
                            {capitalizeFirstLetter(source[0].EVMVersion)}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 md:mt-2 grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg bg-white border-1 shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500">
                          Is Proxy
                        </dt>
                        <dd>
                          <div className="text-md font-medium text-gray-900">
                            {capitalizeFirstLetter(source[0].IsProxy)}
                          </div>
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
                          Optimization Used
                        </dt>
                        <dd>
                          <div className="text-md font-medium text-gray-900">
                            {capitalizeFirstLetter(source[0].OptimizationUsed)}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <label
              htmlFor="sourcedisplay"
              className="mt-2 block text-sm font-medium text-gray-700"
            >
              Source Code
            </label>
            <div className="mt-1">
              <textarea
                value={source[0].SourceCode}
                rows={10}
                readOnly
                name="sourcedisplay"
                id="sourcedisplay"
                className="block w-full rounded-md border-mant shadow-sm focus:border-mant focus:ring-mant sm:text-md text-gray-900"
              />
            </div>
            <label
              htmlFor="abidisplay"
              className="mt-2 block text-sm font-medium text-gray-700"
            >
              ABI
            </label>
            <div className="mt-1">
              <textarea
                value={source[0].ABI}
                rows={5}
                readOnly
                name="abidisplay"
                id="abidisplay"
                className="block w-full rounded-md border-mant shadow-sm focus:border-mant focus:ring-mant sm:text-md text-gray-900"
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const Contract = () => {
  let params = useParams();
  const addressHash = params.contractId;
  return <Source addressHash={addressHash} />;
};

export default Contract;
