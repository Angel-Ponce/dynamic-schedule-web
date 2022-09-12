/**
 * Function to capitalize and extract initials from some string
 * @example Angel Ponce string will return AP
 * @returns string
 */
const getUserInitials = (input: string): string => {
  const words = input.split(/(\s+|-+)/); //Split words with " " and "-"

  const result = words.map((word) => word.substring(0, 1).toUpperCase());

  return `${result.at(0) || ""}${(result.length >= 2 && result.at(-1)) || ""}`;
};

export { getUserInitials };
