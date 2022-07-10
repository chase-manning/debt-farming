export const getVolatileToken = (tokens: string[]) => {
  return tokens.find((token) => volatileTokens.includes(token));
};

const volatileTokens: string[] = [
  "MIM",
  "FRAX",
  "sUSD",
  "TUSD",
  "alUSD",
  "mUSD",
  "OUSD",
  "BUSD",
  "LUSD",
  "USDN",
  "DOLA",
  "GUSD",
  "PUSD",
  "USDP",
  "USDD",
  "FEI",
  "PAXOS",
  "PWRD",
  "HUSD",
  "USDK",
  "DUSD",
  "RSV",
  "renBTC",
  "sBTC",
  "wibBTC",
  "HBTC",
  "pBTC",
  "oBTC",
  "BBTC",
  "stETH",
  "alETH",
  "sETH",
  "rETH",
  "wstETH",
  "ankrETH",
  "rETH",
];

export default volatileTokens;
