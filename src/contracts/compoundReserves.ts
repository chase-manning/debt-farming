import { useEffect, useState } from "react";
import { createClient } from "urql";
import { Reserve } from "./reserves";

const tokensQuery = `
  query {
    markets {
      borrowRate,
      collateralFactor,
      supplyRate,
      underlyingSymbol,
    }
  }
`;

const client = createClient({
  url: "https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2",
});

interface ReserveResponse {
  borrowRate: string;
  collateralFactor: string;
  supplyRate: string;
  underlyingSymbol: string;
}

const useCompoundReserves = () => {
  const [reserves, setReserves] = useState<Reserve[]>([]);

  useEffect(() => {
    const getReserves = async () => {
      const response = await client.query(tokensQuery).toPromise();
      setReserves(
        response.data.markets.map((reserve: ReserveResponse) => {
          return {
            symbol: reserve.underlyingSymbol,
            liquidityRate: Number(reserve.supplyRate) * 100,
            borrowRate: Number(reserve.borrowRate) * 100,
            protocol: "Compound",
            collateralFactor: Number(reserve.collateralFactor),
            canUseAsCollateral: Number(reserve.collateralFactor) !== 0,
            canBorrow: true,
          };
        })
      );
    };
    getReserves();
  }, []);

  return reserves;
};

export default useCompoundReserves;
