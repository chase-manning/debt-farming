import useAaveReserves from "./aaveReserves";

export interface Reserve {
  symbol: string;
  liquidityRate: string;
  borrowRate: string;
  protocol: string;
}

const useReserves = (): Reserve[] => {
  const aaveReserves = useAaveReserves();

  return aaveReserves;
};

export default useReserves;
