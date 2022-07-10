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
];

export default tokenPrefixes;
