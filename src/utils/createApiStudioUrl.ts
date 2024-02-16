const APP_API_STUDIO_URL = "https://app.airstack.xyz/api-studio";

export function createApiStudioUrl(
  query: string,
  variables?: Record<string, string | number>
) {
  const base64Query = Buffer.from(query).toString("base64");

  const searchParams = new URLSearchParams({
    autoRun: "true",
    query: base64Query,
  });

  if (variables) {
    const stringVariables = JSON.stringify(variables);
    const base64Variables = Buffer.from(stringVariables).toString("base64");
    searchParams.set("variables", base64Variables);
  }

  return `${APP_API_STUDIO_URL}?${searchParams.toString()}`;
}
