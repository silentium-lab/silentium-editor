import { Applied, Computed, Connected, Context, Late, Of } from 'silentium';
import { Modal } from './Modal';
import { html, Mount } from 'silentium-ui';
import { Tr } from '../../io/Translation';
import { Bool, Template } from 'silentium-components';

export function NodeTypeForm() {
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
