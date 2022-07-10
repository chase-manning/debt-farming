import useAaveReserves from "./aaveReserves";

export interface Reserve {
  symbol: string;
  liquidityRate: number;
  borrowRate: number;
  protocol: string;
}

const useReserves = (): Reserve[] => {
  const aaveReserves = useAaveReserves();

  return aaveReserves;
};

export default useReserves;
