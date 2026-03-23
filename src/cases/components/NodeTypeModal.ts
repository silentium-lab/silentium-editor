import { All, Any, Applied, Connected, Context, Late, Local, MessageSourceType, SourceComputed } from 'silentium';
import { Template } from 'silentium-components';
import { Button, html, Mount } from 'silentium-ui';
import { TheMap } from '../../domain/Map';
import { Tr } from '../../io/Translation';
import { Modal } from './Modal';
import { TypeForm } from './TypeForm';

export function NodeTypeModal(map$: MessageSourceType<TheMap>) {
  const typeId$ = Context<{id: string}>('active-node-type-id');
  const localMap$ = Local(map$);
  const activeType$ = Applied(All(typeId$, localMap$), ([typeId, localMap]) => {
    const types = Object.values(localMap.types);
    if (!types) {
      throw Error('Type not found!');
    }
    if (types[typeId.id]) {
      return types[typeId.id];
    }
    return types.find(t => t.id === typeId.id || t.name === typeId.id)
  });
  const opened$ = Late(false);
  typeId$.then(() => {
    opened$.use(true);
  });

  const type$ = Context('map-type');
  type$.then(() => {
    opened$.use(false);
  });

  const deleted$ = Late();
  deleted$.then(console.log);

  return Connected<string>(
    Mount(
      Modal(
        Tr('Object type'),
        Template(
          t =>
            html`<div>
              <div>${t.raw(TypeForm(SourceComputed(
                Any(type$, activeType$),
                type$
              ), Button(Tr('Delete'), 'btn bg-danger text-base', deleted$)))}</div>
            </div>`
        ),
        opened$
      )
    ),
    typeId$,
    localMap$,
  );
}
