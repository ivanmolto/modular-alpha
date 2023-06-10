import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BlockTracker = () => {
  const [blockNumber, setBlockNumber] = useState("");
  let navigate = useNavigate();

  const blockChangeHandler = (event) => {
    setBlockNumber(event.target.value.toLowerCase());
  };

  async function submitHandler(event) {
    event.preventDefault();
    navigate(`/blocks/${blockNumber}`, { replace: true });
    setBlockNumber("");
  }

  return (
    <div className="font-montserrat">
      <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
        Mantle Testnet
      </div>
      <main className="flex-1 flex-col pb-8">
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Block Tracker
          </h2>
          <div>
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-3 md:flex md:items-center md:justify-between sm:border-t sm:border-mant"></div>
            </div>
          </div>
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <form
              onSubmit={submitHandler}
              className="space-y-8 divide-y divide-gray-200"
            >
              <div className="space-y-8 divide-y divide-gray-200">
                <div className="pt-8">
                  <div>
                    <h3 className="text-base leading-6 font-medium text-gray-900">
                      Fill in the input to see the Block details
                    </h3>
                  </div>
                  <div className="sm:col-span-3 mt-4">
                    <label
                      htmlFor="blocknumber"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Block number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        value={blockNumber}
                        onChange={blockChangeHandler}
                        name="blocknumber"
                        id="blocknumber"
                        autoComplete="blocknumber"
                        placeholder="123456"
                        className="shadow-sm focus:ring-mant focus:border-mant block w-5/6 sm:w-full sm:text-sm border-mant rounded-md"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm w-5/6 sm:w-full text-sm font-medium rounded-md text-white bg-mant hover:bg-bit focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mant"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
export default BlockTracker;
