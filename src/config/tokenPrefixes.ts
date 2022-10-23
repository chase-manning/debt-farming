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
    prefix: "VE",
  },
  {
    protocol: "vesper",
    prefix: "V",
  },
  {
    protocol: "damm-finance",
    prefix: "DA",
  },
  {
    protocol: "damm-finance",
    prefix: "DC",
  },
  {
    protocol: "damm-finance",
    prefix: "D",
  },
  {
    protocol: "tenderize",
    prefix: "T",
  },
];

export default tokenPrefixes;
