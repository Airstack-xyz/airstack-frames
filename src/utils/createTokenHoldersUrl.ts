const EXPLORER_TOKEN_HOLDERS_URL =
  "https://explorer.airstack.xyz/token-holders";

function createFormattedRawInput({
  label,
  address,
  type,
  blockchain,
}: {
  label: string;
  address: string;
  type: string;
  blockchain: string;
}) {
  return `#⎱${label}⎱(${address} ${type} ${blockchain} null)`;
}

export function createTokenHoldersUrl({
  address,
  blockchain,
  type,
  label,
}: {
  label: string;
  address: string;
  type: string;
  blockchain: string;
}) {
  const searchParams = new URLSearchParams({
    address,
    blockchain,
    inputType: "ADDRESS",
    tokenType: type,
    rawInput: createFormattedRawInput({
      type,
      address,
      label,
      blockchain,
    }),
  });

  return `${EXPLORER_TOKEN_HOLDERS_URL}?${searchParams.toString()}`;
}
