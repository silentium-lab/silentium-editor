import {
  All,
  Applied,
  Connected,
  Context,
  MessageType,
  Primitive,
  SourceType,
  Void,
} from 'silentium';
import { Getter, Path, Template } from 'silentium-components';
import { ClassName, html, Id } from 'silentium-ui';
import { Element } from 'silentium-web-api';
import { TheNode } from '@/types/Node';
import { NodeEntity } from '@/models/NodeEntity';
import { ThePosition } from '@/types/Position';
import { ClickWithoutDrag } from '@/io/ClickWithoutDrag';
import { Draggable } from '@/io/Draggable';
import { Line } from '@/io/Line';
import { NodeTopName } from '@/views/components/NodeTopName';

export function NodeOnMap(
  newNodePosition: SourceType<[TheNode, ThePosition]>,
  nodeEntity$: MessageType<NodeEntity>
) {
  const node$ = Applied(nodeEntity$, n => n.data());
  const left$ = Path(node$, 'position.0');
  const top$ = Path(node$, 'position.1');
  const z$ = Path(node$, 'zindex');
  const id$ = Id();
  const clickId$ = Id();
  const container$ = Element(ClassName(id$));
  const clickContainer$ = Element(ClassName(clickId$));
  const draggable$ = Draggable(container$, {}, undefined, '.node-view');
  newNodePosition.chain(All(node$, draggable$));
  const line$ = Line(node$).then(Void());
  const node = Primitive(node$);
  const clicked$ = ClickWithoutDrag(clickContainer$);
  const activeNodeId$ = Context('active-node-id');
  clicked$.then(e => {
    activeNodeId$.use({ id: node.primitiveWithException().id });
  });
  return Connected<string>(
    Template(
      t =>
        html`<div
          class="node-view flex flex-col items-center text-sm select-none absolute ${t.escaped(
            id$
          )} node-id-${t.escaped(Path(node$, 'id'))}"
          style="left: ${t.escaped(left$)}px;top: ${t.escaped(top$)}px;z-index: ${t.escaped(z$)}"
        >
          <span> ${t.raw(Applied(nodeEntity$, NodeTopName))} </span>
          <div class="${t.escaped(clickId$)}">
            ${t.raw(Applied(nodeEntity$, n => n.template()))}
          </div>
          <span> ${t.raw(Getter(nodeEntity$, 'bottomName'))} </span>
        </div>`
    ),
    container$,
    clickContainer$,
    draggable$,
    line$,
    clicked$
  );
}
