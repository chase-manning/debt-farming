import useAaveReserves from "./aaveReserves";
import useCompoundReserves from "./compoundReserves";

export interface Reserve {
  symbol: string;
  liquidityRate: number;
  borrowRate: number;
  protocol: string;
  collateralFactor: number;
  canUseAsCollateral: boolean;
  canBorrow: boolean;
}

const useReserves = (): Reserve[] => {
  const aaveReserves = useAaveReserves();
  const compoundReserves = useCompoundReserves();

  return [...aaveReserves, ...compoundReserves];
};

export default useReserves;
