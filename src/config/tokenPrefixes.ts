export interface TokenPrefix {
  protocol: string;
  prefix: string;
}

const tokenPrefixes: TokenPrefix[] = [
  {
    protocol: "compound",
    prefix: "C",
  },
  {
    protocol: "yearn-finance",
    prefix: "YV",
  },
  {
    protocol: "vesper",
    prefix: "VA",
  },
  {
    protocol: "vesper",
    prefix: "V",
  },
  {
    protocol: "vesper",
    prefix: "VE",
  },
];

export default tokenPrefixes;
