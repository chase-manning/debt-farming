import { isPegged } from "../config/peggedTokens";
import useAaveReserves from "./aaveReserves";
import useCompoundReserves from "./compoundReserves";
import { Reserve } from "./reserves";
import useYields, { Yield } from "./yields";

interface Strategy {
  collateral: Reserve;
  debt: Reserve;
  yield: Yield;
  netApy: number;
}

const getStrategies = (
  yields: Yield[],
  reserves: Reserve[],
  token: string
): Strategy[] => {
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

const useStrategies = (token: string): Strategy[] => {
  const aaveReserves = useAaveReserves();
  const compoundReserves = useCompoundReserves();
  const yields = useYields();

  return [
    ...getStrategies(yields, aaveReserves, token),
    ...getStrategies(yields, compoundReserves, token),
  ];
};

export default useStrategies;
