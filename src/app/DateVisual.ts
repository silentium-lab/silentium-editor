export function DateVisual(ts: string | number) {
  return new Date(ts).toLocaleDateString();
}
