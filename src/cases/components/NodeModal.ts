import {
  Any,
  Applied,
  Connected,
  Context,
  Late,
  MessageType,
  Of,
  SourceComputed,
  Value,
} from 'silentium';
import { HashTable, Path, Polling, Template } from 'silentium-components';
import { Button, html, Mount } from 'silentium-ui';
import { TheNode } from '../../domain/Node';
import { MapModel } from '../../flows/MapModel';
import { Tr } from '../../io/Translation';
import { Modal } from './Modal';
import { NodeForm } from './NodeForm';
import { DateReadable } from '../formats/DateReadable';

export function NodeModal(nodeEditBlock$: MessageType<[string, boolean]>, mapModel: MapModel) {
  const nodeBlockRecord$ = HashTable(nodeEditBlock$);
  const isBlocked$ = Applied(nodeBlockRecord$, record =>
    Object.values(record).some(v => v === true)
  );
  const opened$ = Late(false);
  const activeNodeId$ = Context<{ id: string }>('active-node-id');
  const nodeEditBlock = Value(isBlocked$);
  activeNodeId$.then(e => {
    if (nodeEditBlock.value) {
      return;
    }
    opened$.use(true);
  });
  const deleted$ = Late();
  Polling(Of(Value(activeNodeId$)), deleted$).then(active => {
    mapModel.object(active.value.id).delete();
    opened$.use(false);
  });

  const saved$ = Late(false);
  const object$ = Late<TheNode>();
  const activeObject$ = mapModel.activeObject();
  object$.then(object => {
    mapModel.object(object.id).save(object);
    opened$.use(false);
  });

  return Connected<string>(
    Mount(
      Modal(
        Template(t => `${t.escaped(Tr('Map object'))} #${t.escaped(Path(activeNodeId$, 'id'))}`),
        Template(
          t =>
            html`<div>
              <div class="mb-2">
                <b>
                  ${t.escaped(Tr('Creation date'))}:
                  ${t.escaped(DateReadable(Path(activeObject$, 'createTimestamp')))}
                </b>
              </div>
              <div class="mb-2">
                <b>
                  ${t.escaped(Tr('Update date'))}:
                  ${t.escaped(DateReadable(Path(activeObject$, 'changeTimestamp')))}
                </b>
              </div>
              <div class="mb-2">
                ${t.raw(NodeForm(SourceComputed(Any(object$, activeObject$), object$), saved$))}
              </div>
              <div class="border-t pt-4 mt-4 border-gray-400 flex gap-2">
                ${t.raw(Button(Tr('Save'), 'btn text-base', saved$))}
                ${t.raw(Button(Tr('Delete'), 'btn bg-danger text-base', deleted$))}
              </div>
            </div>`
        ),
        opened$
      )
    ),
    activeNodeId$,
    activeObject$,
    deleted$
  );
}
