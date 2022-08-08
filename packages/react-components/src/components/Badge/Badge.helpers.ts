export function formatCount(count: number, limit: number): string {
  return count > limit ? `${limit}+` : `${count}`;
}
