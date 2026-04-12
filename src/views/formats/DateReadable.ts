import { Applied, MessageType } from 'silentium';

export function DateReadable(timestamp$: MessageType<string>) {
  return Applied(timestamp$, ts => new Date(ts).toLocaleString());
}
