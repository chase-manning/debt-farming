export const isPegged = (tokenA: string, tokenB: string): boolean => {
  if (tokenA === tokenB) return true;
  for (let i = 0; i < peggedTokens.length; i++) {
    if (!peggedTokens[i].includes(tokenA)) continue;
    return peggedTokens[i].includes(tokenB);
  }
  return false;
};

const peggedTokens: string[][] = [
  ["ETH", "WETH", "stETH", "STETH", "wstETH"],
  ["CRV", "cvxCRV"],
  ["FXS", "cvxFXS"],
  ["CVX", "bveCVX"],
];

export default peggedTokens;
