export const tokensAreSameCurrency = (tokens: string[]): boolean => {
  for (let i = 0; i < tokenCurrencies.length; i++) {
    if (!tokenCurrencies[i].includes(tokens[0])) continue;
    return !tokens.some((token) => !tokenCurrencies[i].includes(token));
  }
  return false;
};

const tokenCurrencies: string[][] = [
  [
    "USDC",
    "USDT",
    "DAI",
    "3CRV",
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
  ],
  ["renBTC", "sBTC", "wibBTC", "HBTC", "pBTC", "oBTC", "BBTC", "WBTC"],
  ["stETH", "alETH", "sETH", "rETH", "wstETH", "ankrETH", "rETH", "ETH"],
  ["cvxCRV", "CRV"],
  ["cvxFXS", "FXS"],
];

export default tokenCurrencies;
