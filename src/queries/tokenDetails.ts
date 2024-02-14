export const tokenDetailsQuery = `query GetTokenDetails($address: Address!, $blockchain: TokenBlockchain!) {
  Token(input: {address: $address, blockchain: $blockchain}) {
    type
    name
    blockchain
    totalSupply
    logo {
      small
    }
    projectDetails {
      imageUrl
      description
    }
    contractMetaData {
      image
      description
    }
    tokenNfts(input: {limit: 1, order: {tokenId: ASC}}) {
      tokenId
      totalSupply
      metaData {
        description
      }
      contentValue {
        image {
          small
        }
      }
    }
  }
  TokenTransfers(
    input: {filter: {tokenAddress: {_eq: $address}, from: {_eq: "0x0000000000000000000000000000000000000000"}}, blockchain: $blockchain, order: {blockTimestamp: ASC}, limit: 1}
  ) {
    TokenTransfer {
      type
      blockchain
      tokenId
      blockTimestamp
    }
  }
}`;
