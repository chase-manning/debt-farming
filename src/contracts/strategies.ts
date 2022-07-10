import { useEffect, useState } from "react";
import { DEFI_LAMA_YIELDS_URL } from "../app/globals";

interface Strategy {
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

const useStrategies = (): Strategy[] => {
  const [strategies, setStrategies] = useState<Strategy[]>([]);

  useEffect(() => {
    const getYields = async () => {
      const response = await fetch(DEFI_LAMA_YIELDS_URL);
      const data = await response.json();
      setStrategies(
        data.data
          .filter((res: Response) => res.chain === "Ethereum")
          .map((res: Response) => {
            return {
              symbol: res.symbol,
              protocol: res.pool,
              apy: res.apy,
            };
          })
      );
    };
    getYields();
  }, []);

  return strategies;
};

export default useStrategies;
