import { useEffect, useState } from "react";
import { createClient } from "urql";
import { stringToNumber } from "./helpers";
import { Reserve } from "./reserves";

const tokensQuery = `
  query {
    assets {
		  symbol,
      borrowAPY,
      supplyAPY,
      config {
        collateralFactor,
        borrowIsolated,
        tier
      }
    }
  }
`;

const client = createClient({
  url: "https://api.thegraph.com/subgraphs/name/shippooordao/euler-mainnet",
});

interface ReserveResponse {
  borrowAPY: string;
  supplyAPY: string;
  symbol: string;
  config: {
    collateralFactor: string;
    borrowIsolated: boolean;
    tier: string;
  };
}

const useEulerReseves = () => {
  const [reserves, setReserves] = useState<Reserve[]>([]);

  useEffect(() => {
    const getReserves = async () => {
      const response = await client.query(tokensQuery).toPromise();
      console.log(response);
      setReserves(
        response.data.assets
          .filter((reserve: ReserveResponse) => reserve.config)
          .map((reserve: ReserveResponse) => {
            return {
              symbol: reserve.symbol,
              liquidityRate: stringToNumber(reserve.supplyAPY, 25),
              borrowRate: stringToNumber(reserve.borrowAPY, 25),
              protocol: "Euler",
              collateralFactor: stringToNumber(
                reserve.config.collateralFactor,
                10
              ),
              canUseAsCollateral: reserve.config.tier === "collateral",
              canBorrow: true,
            };
          })
      );
    };
    getReserves();
  }, []);

  return reserves;
};

export default useEulerReseves;
