import { useEffect, useState } from "react";
import { createClient } from "urql";
import { stringToNumber } from "../app/helpers";
import { Reserve } from "./reserves";

const tokensQuery = `
  query {
    assets {
		  symbol,
      borrowAPY,
      supplyAPY,
      totalBalancesUsd,
      totalBorrowsUsd,
      decimals,
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
  totalBalancesUsd: string;
  totalBorrowsUsd: string;
  symbol: string;
  decimals: string;
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
      setReserves(
        response.data.assets
          .filter(
            (reserve: ReserveResponse) =>
              stringToNumber(
                reserve.totalBalancesUsd,
                Number(reserve.decimals)
              ) > 100 && reserve.config
          )
          .map((reserve: ReserveResponse) => {
            return {
              symbol: reserve.symbol,
              liquidityRate: stringToNumber(reserve.supplyAPY, 25),
              borrowRate: stringToNumber(reserve.borrowAPY, 25),
              protocol: "euler",
              collateralFactor: 0.89,
              // collateralFactor: stringToNumber(
              //   reserve.config.collateralFactor,
              //   10
              // ),
              canUseAsCollateral:
                stringToNumber(
                  reserve.totalBalancesUsd,
                  Number(reserve.decimals)
                ) > 100,
              canBorrow:
                stringToNumber(
                  reserve.totalBorrowsUsd,
                  Number(reserve.decimals)
                ) > 1,
            };
          })
      );
    };
    getReserves();
  }, []);

  return reserves;
};

export default useEulerReseves;
