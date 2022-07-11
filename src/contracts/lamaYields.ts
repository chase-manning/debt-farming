import { useEffect, useState } from "react";
import { DEFI_LAMA_YIELDS_URL } from "../app/globals";
import { tokensAreSameCurrency } from "../config/tokenCurrencies";
import tokenPrefixes, { TokenPrefix } from "../config/tokenPrefixes";
import { getVolatileToken } from "../config/volatileTokens";
import { Yield } from "./yields";

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

const removeParentheses = (string: string): string => {
  const parenthesisPosition = string.indexOf("(");
  if (parenthesisPosition === -1) return string;
  return string.substring(0, parenthesisPosition - 1);
};

const useLamaYields = (): Yield[] => {
  const [yields, setYields] = useState<Yield[]>([]);

  useEffect(() => {
    const getYields = async () => {
      const response = await fetch(DEFI_LAMA_YIELDS_URL);
      const data = await response.json();
      setYields(
        data.data
          .filter(
            (res: Response) => res.chain === "Ethereum" && res.tvlUsd >= 100_000
          )
          .map((res: Response) => {
            let { symbol } = res;
            const protocol = res.project;

            // Removing parenthesis from symbol
            symbol = removeParentheses(symbol);

            // Extracting most volatile asset
            if (symbol.includes("-")) {
              const symbols = symbol.split("-");
              if (tokensAreSameCurrency(symbols)) {
                const volatileToken = getVolatileToken(symbols);
                if (volatileToken) symbol = volatileToken;
              }
            }

            // Removing redundant prefixes
            tokenPrefixes.forEach((prefix: TokenPrefix) => {
              if (protocol !== prefix.protocol) return;
              if (!symbol.startsWith(prefix.prefix)) return;
              symbol = symbol.replace(prefix.prefix, "");
            });

            // Returning the yield
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

export default useLamaYields;
