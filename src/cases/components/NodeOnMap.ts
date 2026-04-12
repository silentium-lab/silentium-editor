import { All, Applied, Connected, Context, MessageType, Primitive, SourceType, Void } from 'silentium';
import { Path, Template } from 'silentium-components';
import { ClassName, html, Id } from 'silentium-ui';
import { Element } from 'silentium-web-api';
import { Node } from '@/domain/Node';
import { NodeEntity } from '@/domain/NodeEntity';
import { Position } from '@/domain/Position';
import { ClickWithoutDrag } from '@/io/ClickWithoutDrag';
import { Draggable } from '@/io/Draggable';
import { Line } from '@/io/Line';

export function NodeOnMap(
  newNodePosition: SourceType<[Node, Position]>,
  nodeEntity$: MessageType<NodeEntity>
) {
  const node$ = Applied(nodeEntity$, (n) => n.data());
  const left$ = Path(node$, 'position.0');
  const top$ = Path(node$, 'position.1');
  const z$ = Path(node$, 'zindex');
  const id$ = Id();
  const container$ = Element(ClassName(id$));
  const draggable$ = Draggable(container$, {}, undefined, '.node-view');
  newNodePosition.chain(All(node$, draggable$));
  const line$ = Line(node$).then(Void());
  const node = Primitive(node$);
  const clicked$ = ClickWithoutDrag(container$);
  const activeNodeId$ = Context('active-node-id');
  clicked$.then(e => {
    activeNodeId$.use({ id: node.primitiveWithException().id });
  });
  return Connected<string>(
    Template(
      t =>
        html`<div
          class="node-view select-none absolute ${t.escaped(id$)} node-id-${t.escaped(
          Path(node$, 'id')
        )}"
          style="left: ${t.escaped(left$)}px;top: ${t.escaped(top$)}px;z-index: ${t.escaped(z$)}"
        >
          ${t.raw(Applied(nodeEntity$, (n) => n.template()))}
        </div>`
    ),
    container$,
    draggable$,
    line$,
    clicked$
  );
}
