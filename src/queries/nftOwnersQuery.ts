export const getNftOwnersQuery = ({
  tokenAddress,
  blockchain,
}: {
  tokenAddress: string;
  blockchain: string;
}) => {
  return `query NftOwners($limit: Int = 20) {
        ${blockchain}: TokenBalances(
          input: {filter: {tokenAddress: {_eq: "${tokenAddress}"}}, blockchain: ${blockchain}, limit: $limit}
        ) {
          TokenBalance {
            tokenId
            tokenAddress
            tokenType
            formattedAmount
            blockchain
            token {
              logo {
                small
              }
              projectDetails {
                imageUrl
              }
            }
            tokenNfts {
              contentValue {
                video {
                  original
                }
                image {
                  small
                  medium
                }
              }
              erc6551Accounts {
                address {
                  identity
                }
              }
            }
            owner {
              identity
              addresses
              blockchain
              accounts {
                tokenId
                tokenAddress
              }
              socials {
                blockchain
                dappName
                profileName
                profileHandle
              }
              primaryDomain {
                name
              }
              domains {
                name
              }
              xmtp {
                isXMTPEnabled
              }
            }
          }
        }
      }`;
};
