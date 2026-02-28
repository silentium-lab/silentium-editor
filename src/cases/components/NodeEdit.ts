import { Applied, Context, MessageType, Of, Value } from 'silentium';
import { HashTable } from 'silentium-components';

export function NodeEdit(nodeEditBlock$: MessageType<[string, boolean]>) {
  const nodeBlockRecord$ = HashTable(nodeEditBlock$);
  const isBlocked$ = Applied(nodeBlockRecord$, record =>
    Object.values(record).some(v => v === true)
  );
  isBlocked$.then(console.log);
  const activeNodeId$ = Context('active-node-id');
  const nodeEditBlock = Value(isBlocked$);
  activeNodeId$.then(e => {
    if (nodeEditBlock.value) {
      return;
    }
    console.log('Open node edit', e);
  });
  return Of('<div></div>');
}
