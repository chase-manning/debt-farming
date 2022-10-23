export interface TokenPrefix {
  protocol: string;
  prefix: string;
}

const tokenPrefixes: TokenPrefix[] = [
  {
    protocol: "compound",
    prefix: "c",
  },
  {
    protocol: "yearn-finance",
    prefix: "YV",
  },
  {
    protocol: "vesper",
    prefix: "va",
  },
  {
    protocol: "vesper",
    prefix: "v",
  },
];

export default tokenPrefixes;
