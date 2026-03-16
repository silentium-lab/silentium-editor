import { Computed, Connected, Context, Late } from 'silentium';
import { Template } from 'silentium-components';
import { html, Mount } from 'silentium-ui';
import { Tr } from '../../io/Translation';
import { Modal } from './Modal';

export function NodeTypeModal() {
  const typeId$ = Context('active-node-type-id');
  typeId$.then(console.log);
  const opened$ = Late(false);
  typeId$.then(() => {
    opened$.use(true);
  });
  return Connected<string>(
    Mount(
      Modal(
        Tr('Object type'),
        Template(
          t =>
            html`<div>
              <div>Edit</div>
              <div>${t.escaped(Computed(JSON.stringify, typeId$))}</div>
            </div>`
        ),
        opened$
      )
    ),
    typeId$
  );
}
