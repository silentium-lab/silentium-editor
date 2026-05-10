export function DateVisual(ts: string | number): string {
  return new Date(ts).toLocaleDateString();
}
