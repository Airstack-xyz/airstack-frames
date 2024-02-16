export function capitalizeFirstLetter(str: string | null | undefined) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncateWithEllipsis(
  str: string | null | undefined,
  limit: number
) {
  if (!str) return "";
  if (str.length <= limit) return str;
  return `${str.substring(0, limit).trim()}...`;
}
