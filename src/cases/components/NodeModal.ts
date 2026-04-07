import {
  Any,
  Connected,
  Context,
  Late,
  Of,
  SourceComputed,
  Value
} from 'silentium';
import { BranchLazy, Path, Polling, Template } from 'silentium-components';
import { Button, html, Mount } from 'silentium-ui';
import { Node } from '../../domain/Node';
import { MapModel } from '../../flows/MapModel';
import { Tr } from '../../io/Translation';
import { DateReadable } from '../formats/DateReadable';
import { Modal } from './Modal';
import { NodeForm } from './NodeForm';

export function NodeModal(this: MapModel) {
  const opened$ = Late(false);
  const activeNodeId$ = Context<{ id: string }>('active-node-id');
  const nodeEditBlock = Value(this.isNodeEditBlocked());
  activeNodeId$.then(() => {
    if (nodeEditBlock.value) {
      return;
    }
    opened$.use(true);
  });
  const deleted$ = Late();
  Polling(Of(Value(activeNodeId$)), deleted$).then(active => {
    this.node(active.value.id).delete();
    opened$.use(false);
  });

  const saved$ = Late<boolean>(false);
  const object$ = Late<Node>();
  const activeObject = this.activeNode();
  const activeObject$ = activeObject.message();
  object$.then(object => {
    this.node(object.id).save(object);
    opened$.use(false);
    saved$.use(false);
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
                ${t.raw(
                  BranchLazy(
                    opened$,
                    () =>
                      NodeForm(
                        SourceComputed(Any(object$, activeObject$), object$),
                        saved$,
                        this.nodeTypes()
                      ),
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
    activeNodeId$,
    activeObject$,
    deleted$
  );
}
