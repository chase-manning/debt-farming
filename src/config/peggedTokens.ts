export const isPegged = (tokenA: string, tokenB: string): boolean => {
  if (tokenA === tokenB) return true;
  if (peggedTokens[tokenA] === tokenB) return true;
  if (peggedTokens[tokenB] === tokenA) return true;
  return false;
};

const peggedTokens: Record<string, string> = {
  ETH: "WETH",
  CRV: "cvxCRV",
  FXS: "cvxFXS",
};

export default peggedTokens;
