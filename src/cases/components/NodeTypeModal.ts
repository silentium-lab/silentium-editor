import { Connected, Context, Late } from 'silentium';
import { Template } from 'silentium-components';
import { html, Mount } from 'silentium-ui';
import { TheNodeType } from '../../domain/NodeType';
import { Tr } from '../../io/Translation';
import { Modal } from './Modal';
import { TypeForm } from './TypeForm';

export function NodeTypeModal() {
  const typeId$ = Context('active-node-type-id');
  typeId$.then(console.log);
  const opened$ = Late(false);
  typeId$.then(() => {
    opened$.use(true);
  });
  const type$ = Late<TheNodeType>();
  return Connected<string>(
    Mount(
      Modal(
        Tr('Object type'),
        Template(
          t =>
            html`<div>
              <div>Edit</div>
              <div>${t.raw(TypeForm(type$))}</div>
            </div>`
        ),
        opened$
      )
    ),
    typeId$
  );
}
