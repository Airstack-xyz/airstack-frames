const APP_EXPLORER_URL = "https://app.airstack.xyz/api-studio";

function encode(string: string) {
  try {
    const encodedString = btoa(string);
    return encodedString;
  } catch {
    return string;
  }
}

export function createAppUrlWithQuery(
  query: string,
  variables?: Record<string, string | number>
) {
  const compressedQuery = encode(query);
  const stringifiedVariables = variables ? JSON.stringify(variables) : "";
  const compressedVariables = stringifiedVariables
    ? encode(stringifiedVariables)
    : "";
  return `${APP_EXPLORER_URL}?autoRun=true&query=${compressedQuery}${
    compressedVariables ? `&variables=${compressedVariables}` : ""
  }`;
}
