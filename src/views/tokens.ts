import { useEffect, useState } from "react";
import { ethToken, TOKENLIST_URL } from "../app/constants";

const manualTokens: Token[] = [
  {
    symbol: "bveCVX",
    url: "https://app.badger.com/assets/icons/bvecvx.svg",
    name: "Badger Vested Escrow Convex Token",
  },
];

export interface Token {
  symbol: string;
  url: string;
  name: string;
}

interface Response {
  address: "0xb6ed7644c69416d67b522e20bc294a9a9b405b31";
  chainId: 1;
  decimals: 8;
  logoURI: "https://zapper.fi/images/0XBTC-icon.png";
  name: "0xBitcoin";
  symbol: "0XBTC";
}

const useTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const fetchTokens = async () => {
      const response = await fetch(TOKENLIST_URL);
      const json = await response.json();
      setTokens(
        json.tokens.map((token: Response): Token => {
          return {
            symbol: token.symbol,
            url: token.logoURI,
            name: token.name,
          };
        })
      );
    };
    fetchTokens();
  }, []);

  return [ethToken, ...tokens, ...manualTokens];
};

export default useTokens;
