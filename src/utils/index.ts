export const getRandomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function capitalizeFirstLetter(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getEllipsisText(
  text: string | null | undefined,
  limit: number
) {
  if (!text) return "";
  if (text.length <= limit) return text;
  return `${text.substring(0, limit).trim()}...`;
}
