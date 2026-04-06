import {
  All,
  Any,
  Applied,
  Connected,
  Context,
  Late,
  Local,
  Of,
  SourceComputed,
  Value,
} from 'silentium';
import { BranchLazy, Path, Polling, Template } from 'silentium-components';
import { Button, html, Mount } from 'silentium-ui';
import { TheNodeType } from '../../domain/NodeType';
import { MapModel } from '../../flows/MapModel';
import { Tr } from '../../io/Translation';
import { Modal } from './Modal';
import { TypeForm } from './TypeForm';

export function NodeTypeModal(this: MapModel) {
  const typeId$ = Context<{ id: string }>('active-node-type-id');
  const localMap$ = Local(this.message());
  const activeType$ = Applied(All(typeId$, localMap$), ([typeId, localMap]) => {
    const types = Object.values(localMap.types);
    if (!types) {
      throw Error('Type not found!');
    }
    if (types[typeId.id]) {
      return types[typeId.id];
    }
    return types.find(t => t.id === typeId.id || t.name === typeId.id);
  });
  const opened$ = Late(false);
  typeId$.then(() => {
    opened$.use(true);
  });

  const type$ = Late<TheNodeType>();
  type$.then(type => {
    const typeModel = this.type(type.id);
    typeModel.save(type);
    opened$.use(false);
    saved$.use(false);
  });

  const deleted$ = Late();
  deleted$.then(console.log);
  const deletion = Polling(Of(Value(typeId$)), deleted$).then(typeId => {
    const type = this.type(typeId.value.id);
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
