import { All, Applied, Connected, Context, Late, Local, MessageSourceType, MessageType, Value } from 'silentium';
import { Template } from 'silentium-components';
import { html, Mount } from 'silentium-ui';
import { TheNodeType } from '../../domain/NodeType';
import { Tr } from '../../io/Translation';
import { Modal } from './Modal';
import { TypeForm } from './TypeForm';
import { TheMap } from '../../domain/Map';

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
  const type$ = Late<TheNodeType>();
  activeType$.then((type) => {
    type$.use(type);
  });

  const map = Value(map$);
  type$.then(type => {
    map$.use({
      ...map.value,
      types: {
        ...map.value.types,
        [type.id]: type
      }
    });
    opened$.use(false);
  })

  return Connected<string>(
    Mount(
      Modal(
        Tr('Object type'),
        Template(
          t =>
            html`<div>
              <div>${t.raw(TypeForm(type$))}</div>
            </div>`
        ),
        opened$
      )
    ),
    typeId$,
    localMap$,
  );
}
