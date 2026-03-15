import { Computed, Connected, Context, Late, Of } from 'silentium';
import { Modal } from './Modal';
import { html, Mount } from 'silentium-ui';
import { Tr } from '../../io/Translation';
import { Template } from 'silentium-components';

export function NodeTypeForm() {
  const typeId$ = Context('active-node-type-id');
  typeId$.then(console.log);
  const opened$ = Late(false);
  return Connected<string>(Mount(Modal(
    Tr('Map type'),
    Template(t => html`<div>
      <div>Edit</div>
      <div>${t.escaped(Computed(JSON.stringify, typeId$))}</div>
    </div>`),
    opened$
  )), typeId$);
}
