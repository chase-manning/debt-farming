import { isPegged } from "../config/peggedTokens";
import useReserves, { Reserve } from "./reserves";
import useYields, { Yield } from "./yields";

interface Strategy {
  collateral: Reserve;
  debt: Reserve;
  yield: Yield;
  netApy: number;
}

const useStrategies = (token: string): Strategy[] => {
  const reserves = useReserves();
  const yields = useYields();

  const collateral = reserves.find((reserve) =>
    isPegged(reserve.symbol, token)
  );

  const farmableYields = yields.filter((y: Yield) =>
    reserves.some(
      (reserve: Reserve) =>
        isPegged(reserve.symbol, y.symbol) &&
        y.apy > reserve.borrowRate &&
        !isPegged(reserve.symbol, token)
    )
  );
  return farmableYields.map((y: Yield) => {
    const debt = reserves.find((reserve) => isPegged(reserve.symbol, y.symbol));
    if (!collateral || !debt)
      return {
        collateral: {
          symbol: "",
          liquidityRate: 0,
          borrowRate: 0,
          protocol: "",
        },
        debt: {
          symbol: "",
          liquidityRate: 0,
          borrowRate: 0,
          protocol: "",
        },
        yield: y,
        netApy: 0,
      };
    return {
      collateral,
      debt,
      yield: y,
      netApy: collateral.liquidityRate + y.apy - debt.borrowRate,
    };
  });
};

export default useStrategies;
