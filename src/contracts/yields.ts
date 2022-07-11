import useConvexYields from "./convexYields";
import useLamaYields from "./lamaYields";

export interface Yield {
  symbol: string;
  protocol: string;
  apy: number;
}

const useYields = (): Yield[] => {
  const lamaYields = useLamaYields();
  const convexYields = useConvexYields();

  return [...lamaYields, ...convexYields];
};

export default useYields;
