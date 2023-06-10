import { Link } from "react-router-dom";

const market = [
  {
    id: 1,
    name: "BIT Token",
    symbol: "BIT",
    address: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
  },
  {
    id: 2,
    name: "DAI Mock",
    symbol: "DAI",
    address: "0xa35d7f5dd89a336a427ebb63c428c3068b6c3105",
  },
  {
    id: 3,
    name: "USDC Mock",
    symbol: "USDC",
    address: "0xbaf72402f98f16e77638ce5fcc5689cd1627e8ff",
  },
  {
    id: 4,
    name: "USDT Mock",
    symbol: "USDT",
    address: "0x093790d873e87b45cee9ca70b12056c705861ecd",
  },
  {
    id: 5,
    name: "Ether",
    symbol: "WETH",
    address: "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111",
  },
  {
    id: 6,
    name: "Mantle Crew",
    symbol: "CREW",
    address: "0xff1718d04961Dc3211c319BE030744B167819401",
  },
  {
    id: 7,
    name: "BIT Delegate",
    symbol: "🗳️",
    address: "0x1bcaFC7D7A34B678caA67F3523BbEf286A2D29a6",
  },
  {
    id: 8,
    name: "BEZ",
    symbol: "BEZ",
    address: "0x0A86FD4227A5d8937D1942bdB59a74B6f3d430f7",
  },
  {
    id: 9,
    name: "Kaspian",
    symbol: "KASP",
    address: "0x5e3eCE6b5Cd6305ae8f0916A050bb839A7573A88",
  },
  {
    id: 10,
    name: "SimpleToken",
    symbol: "SMLT",
    address: "0x8b1902638Eb52F121E995f67Dc4A825912d8979a",
  },
  {
    id: 11,
    name: "ACUA Token",
    symbol: "ACUA",
    address: "0xAAB9D5deBC2aD97552a57Bd161962780D3579508",
  },
  {
    id: 12,
    name: "ANI",
    symbol: "ANI",
    address: "0xF5906F6ee7Db3faF86a41fFF2c13322EadA36b15",
  },
  {
    id: 13,
    name: "BAU",
    symbol: "BAU",
    address: "0x8E44276c2Eb917e5CA60b73b03bCFBA5888114BE",
  },
  {
    id: 14,
    name: "BIT World",
    symbol: "BITW",
    address: "0xE3DAD0Cd8cbEA3f2994D750E9026Fd997DeDcfA4",
  },
  {
    id: 15,
    name: "DigiPuNK",
    symbol: "DPNK",
    address: "0xf0F0a5830d4f7533fC8835aFc03AB0F05Ddd6EAF",
  },
  {
    id: 16,
    name: "Funny",
    symbol: "FNY",
    address: "0x16d638e9dfef934d27dabd7e96f243a89289932f",
  },
  {
    id: 17,
    name: "Mantle stablecoin",
    symbol: "MAS",
    address: "0x6569ec1beea8253daa35584725d0c63e586ea8e2",
  },
  {
    id: 18,
    name: "Memloop",
    symbol: "MLP",
    address: "0xc275ecd77584e6bdff84ae345e6de46b21e710c1",
  },
];
const TokenMarket = () => {
  return (
    <div className="font-montserrat">
      <div className="flex justify-end max-w-6xl mx-auto mt-0 px-4 text-sm leading-6 font-normal text-gray-900 sm:px-6 lg:px-8">
        Mantle Testnet
      </div>
      <main className="flex-1 flex-col pb-8">
        <div className="-mt-3">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-semibold text-gray-900 sm:px-6 lg:px-8">
            Token Market Overview
          </h2>
          <div>
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-3 md:flex md:items-center md:justify-between sm:border-t sm:border-mant"></div>
            </div>
          </div>
          <div className="mt-4 flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <ul
              role="list"
              className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {market.map((token) => (
                <li
                  key={token.id}
                  className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow hover:shadow-lg"
                >
                  <Link to={`/tokens/${token.address}`}>
                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                      <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                          <h3 className="truncate text-sm font-medium text-gray-900">
                            {token.name}
                          </h3>
                          <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            {token.symbol}
                          </span>
                        </div>

                        <p className="mt-1 truncate text-sm text-blue-500">
                          {token.address}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TokenMarket;
