import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

const BLOCK = gql`
  query GetBlock($number: Int!) {
    block(number: $number) {
      consensus
      difficulty
      gasLimit
      gasUsed
      hash
      minerHash
      nonce
      number
      parentHash
      size
      timestamp
      totalDifficulty
    }
  }
`;

function numberWithCommas(rawNumber) {
  var parts = rawNumber.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

const Block = () => {
  let params = useParams();
  const number = parseInt(params.blockId);
  const { loading, error, data } = useQuery(BLOCK, {
    variables: { number: number },
  });
  if (loading)
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Block Details
          </h2>
          <div>
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-3 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>
              Loading block details...
            </div>
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Block Details
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
  if (data.block === null)
    return (
      <div className="font-montserrat">
        <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
          Mantle Testnet
        </div>
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Block Details
          </h2>
          <div>
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-3 md:flex md:items-center md:justify-between lg:border-t border-eorange lg:border-eorange"></div>
              Sorry no data available or the block has not been processed yet
            </div>
          </div>
        </div>
      </div>
    );
  const stamp = new Date(data.block.timestamp);
  return (
    <div className="font-montserrat">
      <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
        Mantle Testnet
      </div>
      <div className="-mt-3">
        <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
          Block Details
        </h2>
        <div>
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="py-3 md:flex md:items-center md:justify-between lg:border-t border-mant lg:border-mant"></div>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="mt-2 grid gap-2 grid-cols-1 sm:gap-5 sm:grid-cols-2">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Block Height
                      </dt>
                      <dd>
                        <div className="text-md font-medium">
                          {data.block.number}
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
                        <div className="truncate text-md font-medium">
                          {stamp.toString()}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 grid gap-2 grid-cols-1 sm:gap-5 sm:grid-cols-2">
            <div className="overflow-hidden rounded-lg bg-white shadow hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0"></div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <Link
                        to={`/accounts/${data.block.minerHash}`}
                        className="truncate text-md font-medium"
                      >
                        <dt className="truncate text-sm font-medium text-gray-500">
                          Miner
                        </dt>
                        <dd className="truncate text-md font-medium text-blue-500">
                          {data.block.minerHash}
                        </dd>
                      </Link>
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
                        Size
                      </dt>
                      <dd>
                        <div className="text-md font-medium">
                          {numberWithCommas(data.block.size)} bytes
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 grid gap-2 grid-cols-1 sm:gap-5 sm:grid-cols-2">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Hash
                      </dt>
                      <dd className="truncate text-md font-medium">
                        {data.block.hash}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Parent Hash
                      </dt>
                      <dd>
                        <div className="truncate text-md font-medium ">
                          {data.block.parentHash}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 grid gap-2 grid-cols-1 sm:gap-5 sm:grid-cols-2">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Nonce
                      </dt>
                      <dd>
                        <div className="truncate text-md font-medium">
                          {data.block.nonce}
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
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Consensus
                      </dt>
                      <dd>
                        <div className="text-md font-medium text-green-400">
                          {data.block.consensus.toString() === "true"
                            ? "True"
                            : "False"}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 grid gap-2 grid-cols-1 sm:gap-5 sm:grid-cols-2">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Gas Limit
                      </dt>
                      <dd>
                        <div className="text-md font-medium">
                          {numberWithCommas(data.block.gasLimit)}
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
                        Gas Used
                      </dt>
                      <dd>
                        <div className="text-md font-medium">
                          {numberWithCommas(data.block.gasUsed)}{" "}
                          <span className="ml-1 px-2 py-1 rounded-md bg-black text-white shadow text-xs">
                            {(data.block.gasUsed / data.block.gasLimit).toFixed(
                              4
                            ) * 100}
                            %
                          </span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 grid gap-2 grid-cols-1 sm:gap-5 sm:grid-cols-2">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">
                        Total Difficulty
                      </dt>
                      <dd>
                        <div className="text-md font-medium">
                          {numberWithCommas(data.block.totalDifficulty)}
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
                        Difficulty
                      </dt>
                      <dd>
                        <div className="text-md font-medium">
                          {numberWithCommas(data.block.difficulty)}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Block;
