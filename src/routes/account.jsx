import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NumTransactions from "../components/num-transactions";
import NumPendingTransactions from "../components/num-pending-transactions";
import NumTokens from "../components/num-tokens";
import NumTransfers from "../components/num-transfers";
import TableTransactions from "../components/table-transactions";
import TableTokens from "../components/table-tokens";

function getBalance(addressHash) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  return fetch(
    `https://explorer.testnet.mantle.xyz/api?module=account&action=balance&address=${addressHash}`,
    options
  ).then((response) => response.json());
}

function Balance({ addressHash }) {
  const balanceQuery = useQuery({
    queryKey: ["balance", addressHash],
    queryFn: () => getBalance(addressHash),
  });

  if (balanceQuery.isLoading)
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Address Details
          </h2>
          <div>
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-3 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>
              Loading address...
            </div>
          </div>
        </div>
      </div>
    );
  if (balanceQuery.isError)
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Address Details
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
  if (balanceQuery.data.result === null) {
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Address Details
          </h2>
          <div>
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-3 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>
              Sorry {addressHash} is an{" "}
              {balanceQuery.data.message.toLowerCase()}
            </div>
          </div>
        </div>
      </div>
    );
  }
  const balance = balanceQuery.data.result;
  return (
    <div className="font-montserrat">
      <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
        Mantle Testnet
      </div>
      <main className="flex-1 pb-8">
        <div className="-mt-3 px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <h2 className="font-semibold leading-6 text-lg">Address Details</h2>
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>
          <div className="mt-2 grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0"></div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Address
                      </dt>
                      <dd>
                        <div className="truncate text-md font-medium text-gray-900">
                          {addressHash}
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
                        Net Worth
                      </dt>
                      <dd>
                        <div className="truncate text-md font-medium text-gray-900">
                          N/A
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 md:mt-2 grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2">
            <div className="overflow-hidden text-ellipsis rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        BIT Balance
                      </dt>
                      <dd>
                        <div className="truncate text-md font-medium text-gray-900">
                          {balance / 10 ** 18} BIT
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
                        Tokens
                      </dt>
                      <dd>
                        <NumTokens addressHash={addressHash} />
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
                        Transactions
                      </dt>
                      <dd>
                        <NumTransactions addressHash={addressHash} />
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
                        Pending Transactions
                      </dt>
                      <dd>
                        <NumPendingTransactions addressHash={addressHash} />
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
                        Transfers
                      </dt>
                      <dd>
                        <NumTransfers addressHash={addressHash} />
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TableTokens addressHash={addressHash} />
          <TableTransactions addressHash={addressHash} />
        </div>
      </main>
    </div>
  );
}

const Account = () => {
  let params = useParams();
  const addressHash = params.accountId;
  return <Balance addressHash={addressHash} />;
};

export default Account;
