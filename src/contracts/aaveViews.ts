import { useEffect, useState } from "react";
import { createClient } from "urql";

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
          liquidityRate
        }
      }
    }
  }
`;

const client = createClient({
  url: "https://api.thegraph.com/subgraphs/name/aave/protocol-v2",
});

interface Reserve {
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
}

export const useAaveReserves = () => {
  const [reserves, setReserves] = useState<Reserve[]>([]);

  useEffect(() => {
    const getReserves = async () => {
      const response = await client.query(tokensQuery).toPromise();
      setReserves(response.data.protocols[0].pools[0].reserves);
    };
    getReserves();
  }, []);

  return reserves;
};
