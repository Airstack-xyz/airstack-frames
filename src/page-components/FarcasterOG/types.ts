export type Token = {
  type: string;
  name: string;
  blockchain: string;
  totalSupply: string;
  logo: {
    small: string | null;
  };
  projectDetails: {
    imageUrl: string | null;
    description: string | null;
  };
  contractMetaData: {
    image: string | null;
    description: string | null;
  };
  tokenNfts: {
    tokenId: string;
    metaData: {
      description: string | null;
    };
    contentValue: {
      image: {
        small: string | null;
      };
    };
  }[];
};

export type TokenTransfer = {
  type: string;
  blockchain: string;
  tokenId: string;
  blockTimestamp: string;
};

export type TokenDetailsQueryResponse = {
  Token: Token;
  TokenTransfers: {
    TokenTransfer: TokenTransfer[];
  };
};
