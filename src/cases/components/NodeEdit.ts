import { Applied, Computed, Connected, Context, Late, MessageType, Of, Value } from 'silentium';
import { HashTable, Template } from 'silentium-components';
import { html, Mount } from 'silentium-ui';
import { Modal } from './Modal';
import { Tr } from '../../io/Translation';

export function NodeEdit(nodeEditBlock$: MessageType<[string, boolean]>) {
  const nodeBlockRecord$ = HashTable(nodeEditBlock$);
  const isBlocked$ = Applied(nodeBlockRecord$, record =>
    Object.values(record).some(v => v === true)
  );
  const opened$ = Late(false);
  const activeNodeId$ = Context('active-node-id');
  const nodeEditBlock = Value(isBlocked$);
  activeNodeId$.then(e => {
    if (nodeEditBlock.value) {
      return;
    }
    opened$.use(true);
  });
  return Connected<string>(Mount(Modal(
    Tr('Map object'),
    Template((t) => html`<div>
      <div>Edit</div>
      <div>${t.escaped(Computed(JSON.stringify, activeNodeId$))}</div>
    </div>`),
    opened$
  )), activeNodeId$);
}
