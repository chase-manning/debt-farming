import { useEffect, useState } from "react";
import { DEFI_LAMA_PROTOCOLS_URL } from "../app/constants";

export interface ProtocolType {
  id: string;
  name: string;
  logo: string;
  audits: number;
  url: string;
}

interface Response {
  id: string;
  name: string;
  address: string;
  symbol: string;
  url: string;
  description: string;
  chain: string;
  logo: string;
  audits: string;
  gecko_id: string;
  cmcId: string;
  category: string;
  chains: string[];
  module: string;
  twitter: string;
  audit_links: string[];
  oracles: string[];
  slug: string;
  tvl: number;
  chainTvls: Record<string, number>;
  fdv: number;
  mcap: number;
}

const useProtocols = (): ProtocolType[] => {
  const [protocols, setProtocols] = useState<ProtocolType[]>([]);

  useEffect(() => {
    const getProtocols = async () => {
      const response = await fetch(DEFI_LAMA_PROTOCOLS_URL);
      const data = await response.json();
      setProtocols(
        data.map((res: Response): ProtocolType => {
          return {
            id: res.slug,
            name: res.name,
            logo: res.logo,
            audits: Number(res.audits),
            url: res.url,
          };
        })
      );
    };
    getProtocols();
  }, []);

  return protocols;
};

export default useProtocols;
