import { useEffect, useState } from "react";
import { DEFI_LAMA_YIELDS_URL } from "../app/globals";

interface Yield {
  symbol: string;
  protocol: string;
  apy: number;
}

interface Response {
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apy: number;
  pool: string;
  apyPct1D: number;
  apyPct7D: number;
  apyPct30D: number;
  projectName: string;
  stablecoin: boolean;
  ilRisk: string;
  exposure: string;
  predictions: {
    predictedClass: string;
    predictedProbability: number;
    binnedConfidence: number;
  };
  audits: string;
  audit_links: string[];
  site: string;
  twitter: string;
  category: string;
}

const useYields = (): Yield[] => {
  const [yields, setYields] = useState<Yield[]>([]);

  useEffect(() => {
    const getYields = async () => {
      const response = await fetch(DEFI_LAMA_YIELDS_URL);
      const data = await response.json();
      setYields(
        data.data
          .filter((res: Response) => res.chain === "Ethereum")
          .map((res: Response) => {
            return {
              symbol: res.symbol,
              protocol: res.projectName,
              apy: res.apy,
            };
          })
      );
    };
    getYields();
  }, []);

  return yields;
};

export default useYields;
