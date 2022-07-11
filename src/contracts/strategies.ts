import { isPegged } from "../config/peggedTokens";
import useAaveReserves from "./aaveReserves";
import useCompoundReserves from "./compoundReserves";
import useEulerReseves from "./eulerReserves";
import useIronBankReserves from "./ironBankReserves";
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
  const collateral = reserves.find(
    (reserve) => isPegged(reserve.symbol, token) && reserve.canUseAsCollateral
  );

  const farmableYields = yields.filter((y: Yield) =>
    reserves.some(
      (reserve: Reserve) =>
        isPegged(reserve.symbol, y.symbol) &&
        y.apy > reserve.borrowRate &&
        !isPegged(reserve.symbol, token) &&
        reserve.canBorrow
    )
  );
  return farmableYields.map((y: Yield) => {
    const debt = reserves.find(
      (reserve) => isPegged(reserve.symbol, y.symbol) && reserve.canBorrow
    );
    // TODO Clean this up
    if (!collateral || !debt)
      return {
        collateral: {
          symbol: "",
          liquidityRate: 0,
          borrowRate: 0,
          protocol: "",
          collateralFactor: 0,
          canBorrow: true,
          canUseAsCollateral: true,
        },
        debt: {
          symbol: "",
          liquidityRate: 0,
          borrowRate: 0,
          protocol: "",
          collateralFactor: 0,
          canBorrow: true,
          canUseAsCollateral: true,
        },
        yield: y,
        netApy: 0,
      };
    return {
      collateral,
      debt,
      yield: y,
      netApy:
        collateral.liquidityRate +
        (y.apy - debt.borrowRate) * collateral.collateralFactor,
    };
  });
};

const useStrategies = (token: string): Strategy[] => {
  const aaveReserves = useAaveReserves();
  const compoundReserves = useCompoundReserves();
  const ironBankReserves = useIronBankReserves();
  const eulerReserves = useEulerReseves();
  const yields = useYields();

  return [
    ...getStrategies(yields, aaveReserves, token),
    ...getStrategies(yields, compoundReserves, token),
    ...getStrategies(yields, ironBankReserves, token),
    ...getStrategies(yields, eulerReserves, token),
  ];
};

export default useStrategies;
