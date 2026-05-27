export function DateTimeVisual(ts: string | number): string {
  return new Date(ts).toLocaleString();
}
