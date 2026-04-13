import {
  All,
  Any,
  Applied,
  Connected,
  Context,
  Late,
  Local,
  Of,
  Primitive,
  SourceComputed,
} from 'silentium';
import { BranchLazy, Path, Polling, Template } from 'silentium-components';
import { Button, html, Mount } from 'silentium-ui';
import { NodeType } from '@/types/NodeType';
import { MapBehavior } from '@/behaviors/MapBehavior';
import { Tr } from '@/io/Translation';
import { Modal } from './Modal';
import { TypeForm } from './TypeForm';

export function NodeTypeModal(map: MapBehavior) {
  const typeId$ = Context<{ id: string }>('active-node-type-id');
  const localMap$ = Local(map.message());
  const activeType$ = Applied(All(typeId$, localMap$), ([typeId, localMap]) => {
    return localMap.typeById(typeId.id).data();
  });
  const opened$ = Late(false);
  typeId$.then(() => {
    opened$.use(true);
  });
  const type$ = Late<NodeType>();
  type$.then(type => {
    map.saveNodeType(type);
    opened$.use(false);
    saved$.use(false);
  });
  const deleted$ = Late();
  const deletion = Polling(Of(Primitive(typeId$)), deleted$).then(typeId => {
    const type = map.nodeType(typeId.primitiveWithException().id);
    type.delete();
    opened$.use(false);
  });
  const saved$ = Late(false);
  return Connected<string>(
    Mount(
      Modal(
        Template(t => `${t.escaped(Tr('Object type'))} #${t.escaped(Path(activeType$, 'id'))}`),
        Template(
          t =>
            html`<div>
              <div>
                ${t.raw(
              BranchLazy(
                opened$,
                () => TypeForm(SourceComputed(Any(type$, activeType$), type$), saved$),
                () => Of('-')
              )
            )}
              </div>
            </div>`
        ),
        opened$,
        Template(
          t =>
            html`<div class="flex gap-2">
              ${t.raw(Button(Tr('Save'), 'btn', saved$))}
              ${t.raw(Button(Tr('Delete'), 'btn bg-danger text-base', deleted$))}
            </div>`
        )
      )
    ),
    typeId$,
    localMap$,
    deletion
  );
}
