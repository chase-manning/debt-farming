import { useEffect, useState } from "react";
import { DEFI_LAMA_YIELDS_URL } from "../app/globals";

export interface Yield {
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
            let { symbol } = res;
            const protocol = res.projectName;
            if (protocol === "Compound" && symbol.substring(0, 1) === "c")
              symbol = symbol.substring(1);
            if (protocol === "Yearn Finance" && symbol.substring(0, 2) === "yv")
              symbol = symbol.substring(2);
            return {
              symbol,
              protocol,
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
