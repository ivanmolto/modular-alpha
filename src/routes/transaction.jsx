import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

function numberWithCommas(rawNumber) {
  return rawNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getTransaction(transactionHash) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  return fetch(
    `https://explorer.testnet.mantle.xyz/api?module=transaction&action=gettxinfo&txhash=${transactionHash}`,
    options
  ).then((response) => response.json());
}

function Tx({ transactionHash }) {
  const transactionQuery = useQuery({
    queryKey: ["transaction", transactionHash],
    queryFn: () => getTransaction(transactionHash),
  });

  if (transactionQuery.isLoading)
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Transaction Details
          </h2>
          <div>
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-3 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>
              Loading transaction...
            </div>
          </div>
        </div>
      </div>
    );

  if (transactionQuery.isError)
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Transaction Details
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
  if (transactionQuery.data.result === null)
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Transaction Details
          </h2>
          <div>
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-3 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>
              {transactionHash} is not a valid transaction hash
            </div>
          </div>
        </div>
      </div>
    );
  else {
    const tx = transactionQuery.data.result;
    const stamp = new Date(tx.timeStamp * 1000);
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <main className="flex-1 pb-8">
          <div className="-mt-3 px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <h2 className="font-semibold leading-6 text-lg">
              Transaction Details
            </h2>
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>

            <div className="overflow-hidden rounded-lg bg-white border-1 shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0"></div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500">
                        Transaction Hash
                      </dt>
                      <dd>
                        <div className="truncate text-md font-medium text-gray-900">
                          {tx.hash}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          Result
                        </dt>
                        <dd>
                          <div className="text-md font-medium text-green-400">
                            {tx.success.toString() === "true"
                              ? "Success"
                              : "Error"}
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
                          Status
                        </dt>
                        <dd>
                          <div className="text-md font-medium text-green-400">
                            <span className="px-1.5 py-0.5 rounded-md bg-green-50">
                              {tx.success.toString() === "true"
                                ? "Confirmed"
                                : "Error"}
                            </span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          Block Number
                        </dt>
                        <dd>
                          <div className="text-md font-medium text-gray-900">
                            {tx.blockNumber}{" "}
                            <span className="ml-1 px-2 py-1 rounded-md bg-black text-white shadow text-xs">
                              {tx.confirmations} confirmations
                            </span>
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
                    <div className="flex-shrink-0">
                      <ClockIcon
                        className="h-6 w-6 text-grey-200"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          Timestamp
                        </dt>
                        <dd>
                          <div className="truncate text-md font-medium text-gray-900">
                            {stamp.toString()}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg bg-white border-1 shadow hover:shadow-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <Link
                          to={`/accounts/${tx.from}`}
                          className="truncate text-md font-medium text-blue-500"
                        >
                          <dt className="text-sm font-medium text-gray-500">
                            From
                          </dt>
                          <dd>{tx.from}</dd>
                        </Link>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-white border-1 shadow hover:shadow-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <Link
                          to={`/accounts/${tx.to}`}
                          className="truncate text-md font-medium text-blue-500"
                        >
                          <dt className="truncate text-sm font-medium text-gray-500">
                            To
                          </dt>
                          <dd>{tx.to}</dd>
                        </Link>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0"></div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          Value
                        </dt>
                        <dd>
                          <div className="text-md font-medium text-grey-900">
                            <span className="px-1.5 py-0.5 rounded-md bg-bit">
                              {tx.value} BIT
                            </span>
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
                          Gas Limit
                        </dt>
                        <dd>
                          <div className="text-md font-medium text-gray-900">
                            {numberWithCommas(tx.gasLimit)}
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
                          Gas Price
                        </dt>
                        <dd>
                          <div className="text-md font-medium text-gray-900">
                            {tx.gasPrice / 10 ** 9} Gwei
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
                          Gas Used by Transaction
                        </dt>
                        <dd>
                          <div className="text-md font-medium text-gray-900">
                            {numberWithCommas(tx.gasUsed)}{" "}
                            <span className="ml-1 px-2 py-1 rounded-md bg-black text-white shadow text-xs">
                              {(tx.gasUsed / tx.gasLimit).toFixed(4) * 100}%
                            </span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 overflow-hidden rounded-lg bg-white border-1 shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0"></div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500">
                        Raw Input (Hex)
                      </dt>
                      <dd>
                        <div className="truncate text-md font-medium text-gray-900">
                          {tx.input}
                        </div>
                      </dd>
                    </dl>
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

const Transaction = () => {
  let params = useParams();
  const transactionHash = params.transactionId;
  return <Tx transactionHash={transactionHash} />;
};

export default Transaction;
