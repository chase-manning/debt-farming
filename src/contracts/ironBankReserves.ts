import { useEffect, useState } from "react";
import { createClient } from "urql";
import { Reserve } from "./reserves";

const tokensQuery = `
  query {
    markets {
      isActive,
      canUseAsCollateral,
      canBorrowFrom,
      maximumLTV,
      inputToken {
        symbol
      }
      rates {
    	  rate,
        side,
        type
  	  }
    }
  }
`;

const client = createClient({
  url: "https://api.thegraph.com/subgraphs/name/dmelotik/iron-bank-ethereum",
});

interface ReserveResponse {
  canBorrowFrom: boolean;
  canUseAsCollateral: boolean;
  inputToken: {
    symbol: string;
  };
  isActive: boolean;
  maximumLTV: string;
  rates: [
    {
      rate: string;
      side: string;
      type: string;
    }
  ];
}

const useIronBankReserves = () => {
  const [reserves, setReserves] = useState<Reserve[]>([]);

  useEffect(() => {
    const getReserves = async () => {
      const response = await client.query(tokensQuery).toPromise();
      setReserves(
        response.data.markets
          .filter(
            (reserve: ReserveResponse) =>
              reserve.isActive &&
              reserve.rates.some(
                (rate) => rate.side === "BORROWER" && rate.type === "VARIABLE"
              ) &&
              reserve.rates.some(
                (rate) => rate.side === "LENDER" && rate.type === "VARIABLE"
              )
          )
          .map((reserve: ReserveResponse) => {
            return {
              symbol: reserve.inputToken.symbol,
              liquidityRate:
                Number(
                  reserve.rates.find(
                    (rate) => rate.side === "LENDER" && rate.type === "VARIABLE"
                  )?.rate
                ) || 0,
              borrowRate:
                Number(
                  reserve.rates.find(
                    (rate) =>
                      rate.side === "BORROWER" && rate.type === "VARIABLE"
                  )?.rate
                ) || 0,
              protocol: "Iron Bank",
              collateralFactor: Number(reserve.maximumLTV) / 100,
              canUseAsCollateral: reserve.canUseAsCollateral,
              canBorrow:
                reserve.canBorrowFrom && Number(reserve.maximumLTV) / 100 !== 0,
            };
          })
      );
    };
    getReserves();
  }, []);

  return reserves;
};

export default useIronBankReserves;
