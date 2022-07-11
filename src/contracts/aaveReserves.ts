import { useEffect, useState } from "react";
import { createClient } from "urql";
import { stringToNumber } from "./helpers";
import { Reserve } from "./reserves";

const tokensQuery = `
  query {
    protocols(first: 5) {
      pools (where: {id:"0xb53c1a33016b2dc2ff3653530bff1848a515c8c5"}) {
        reserves{
          symbol,
          decimals,
          usageAsCollateralEnabled,
          borrowingEnabled,
          isActive
          isFrozen,
          totalLiquidity,
          availableLiquidity,
          variableBorrowRate,
          liquidityRate,
          baseLTVasCollateral
        }
      }
    }
  }
`;

const client = createClient({
  url: "https://api.thegraph.com/subgraphs/name/aave/protocol-v2",
});

interface ReserveResponse {
  availableLiquidity: string;
  borrowingEnabled: boolean;
  decimals: number;
  isActive: boolean;
  isFrozen: boolean;
  liquidityRate: string;
  symbol: string;
  totalLiquidity: string;
  usageAsCollateralEnabled: boolean;
  variableBorrowRate: string;
  baseLTVasCollateral: string;
}

const useAaveReserves = () => {
  const [reserves, setReserves] = useState<Reserve[]>([]);

  useEffect(() => {
    const getReserves = async () => {
      const response = await client.query(tokensQuery).toPromise();
      setReserves(
        response.data.protocols[0].pools[0].reserves
          .filter(
            (reserve: ReserveResponse) => reserve.isActive && !reserve.isFrozen
          )
          .map((reserve: ReserveResponse) => {
            return {
              symbol: reserve.symbol,
              liquidityRate: stringToNumber(reserve.liquidityRate, 25),
              borrowRate: stringToNumber(reserve.variableBorrowRate, 25),
              protocol: "Aave V2",
              collateralFactor: Number(reserve.baseLTVasCollateral) / 10_000,
              canUseAsCollateral: reserve.usageAsCollateralEnabled,
              canBorrow:
                reserve.borrowingEnabled &&
                Number(reserve.baseLTVasCollateral) / 10_000 !== 0,
            };
          })
      );
    };
    getReserves();
  }, []);

  return reserves;
};

export default useAaveReserves;
