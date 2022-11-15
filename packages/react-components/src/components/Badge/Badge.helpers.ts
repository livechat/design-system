export function formatCount(count: number, max: number): string {
  return count > max ? `${max}+` : `${count}`;
}
