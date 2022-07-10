export interface TokenPrefix {
  protocol: string;
  prefix: string;
}

const tokenPrefixes: TokenPrefix[] = [
  {
    protocol: "Compound",
    prefix: "c",
  },
  {
    protocol: "Yearn Finance",
    prefix: "yv",
  },
  {
    protocol: "Vesper",
    prefix: "va",
  },
  {
    protocol: "Vesper",
    prefix: "v",
  },
];

export default tokenPrefixes;
