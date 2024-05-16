export function capitalizeFirstLetter(str: string): string {
  return str.at(0)?.toLocaleUpperCase() + str.slice(1);
}
