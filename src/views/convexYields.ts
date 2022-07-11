import { useEffect, useState } from "react";
import { createClient } from "urql";
import { Yield } from "./yields";

const tokensQuery = `
  query {
  	stakingContracts {
    	name,
    	snapshots(orderBy: id, orderDirection: desc, first: 1) {
      	id,
      	crvApr,
      	cvxApr,
      	extraRewardsApr {
        	tokenName,
        	apr
      	}
    	}
  	}
	}
`;

const client = createClient({
  url: "https://api.thegraph.com/subgraphs/name/solvetony/convex-staking",
});

interface Response {
  name: string;
  snapshots: [
    {
      id: string;
      crvApr: string;
      cvxApr: string;
      extraRewardsApr: [
        {
          tokenName: string;
          apr: string;
        }
      ];
    }
  ];
}

const useConvexYields = () => {
  const [yields, setYields] = useState<Yield[]>([]);

  useEffect(() => {
    const getReserves = async () => {
      const response = await client.query(tokensQuery).toPromise();

      setYields(
        response.data.stakingContracts.map((y: Response) => {
          return {
            symbol: y.name === "cvxCrv" ? "cvxCRV" : "CVX",
            protocol: "convex-finance",
            apy:
              Number(y.snapshots[0].cvxApr) * 100 +
              Number(y.snapshots[0].crvApr) * 100 +
              y.snapshots[0].extraRewardsApr.reduce(
                (a: number, b) => a + Number(b.apr) * 100,
                0
              ),
          };
        })
      );
    };
    getReserves();
  }, []);

  return yields;
};

export default useConvexYields;
