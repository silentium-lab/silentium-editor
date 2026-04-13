import { Connected, Late, MessageSourceType, Of } from 'silentium';
import { BranchLazy, Template } from 'silentium-components';
import { Button, html, Mount } from 'silentium-ui';
import { MapStream } from '@/streams/MapStream';
import { Tr } from '@/io/Translation';
import { Modal } from './Modal';
import { TypeForm } from './TypeForm';

const icon =
  '<svg style="width: 20px;height: 20px" class="svg-inline--fa fa-square-plus" data-prefix="fas" data-icon="square-plus" role="img" viewBox="0 0 448 512" aria-hidden="true"><path class="" fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path></svg>';

export function TypeNew(mapModel: MapStream) {
  const opened$ = Late(false);

  return Connected(
    Template(
      t =>
        html`<div class="w-full">
          ${t.raw(
          Mount(
            BranchLazy(
              opened$,
              () => TypeNewModal(opened$, mapModel),
              () => Of('<div></div>')
            )
          )
        )}
          ${t.raw(Button(icon, 'btn w-full flex justify-center', opened$, '', true))}
        </div>`
    ),
    opened$
  );
}

function TypeNewModal(opened$: MessageSourceType<boolean>, mapModel: MapStream) {
  const newType$ = Late<any>({
    id: Date.now().toString(),
  });
  const sub = newType$.then(type => {
    if (Object.values(type).length <= 1) {
      return;
    }
    mapModel.saveNodeType(type);
    opened$.use(false);
  });
  const saved$ = Late(false);

  return Connected(
    Modal(
      Tr('New Type'),
      TypeForm(newType$, saved$),
      opened$,
      Template(t => html`<div class="flex gap-2">${t.raw(Button(Tr('Save'), 'btn', saved$))}</div>`)
    ),
    sub
  );
}
