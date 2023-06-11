import { gql, useQuery } from "@apollo/client";

const TRANSACTION = gql`
  query GetTransaction($hash: FullHash!) {
    transaction(hash: $hash) {
      nonce
      index
    }
  }
`;

const Nonce = ({ transaction }) => {
  const hash = transaction;
  const { loading, error, data } = useQuery(TRANSACTION, {
    variables: { hash: hash },
  });
  if (loading)
    return (
      <div className="text-sm font-normal">Loading nonce and index...</div>
    );
  if (error) return <div>{`Error! ${error.message}`}</div>;

  console.log(data);
  return (
    <div className="mt-3 md:mt-2 grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0"></div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  Nonce
                </dt>
                <dd>
                  <div className="text-md font-medium text-gray-900">
                    {data.transaction.nonce}
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
                  Index
                </dt>
                <dd>
                  <div className="text-md font-medium text-gray-900">
                    {data.transaction.index}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nonce;
