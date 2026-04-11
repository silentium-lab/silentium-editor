import { All, Connected, Context, MessageType, Primitive, SourceType, Void } from 'silentium';
import { Path, Template } from 'silentium-components';
import { ClassName, html, Id } from 'silentium-ui';
import { Element } from 'silentium-web-api';
import { Node } from '../../domain/Node';
import { NodeEntity } from '../../domain/NodeEntity';
import { Position } from '../../domain/Position';
import { ClickWithoutDrag } from '../../io/ClickWithoutDrag';
import { Draggable } from '../../io/Draggable';
import { Line } from '../../io/Line';

export function NodeOnMap(
  newNodePosition: SourceType<[Node, Position]>,
  node$: MessageType<NodeEntity>
) {
  const activeNodeId$ = Context('active-node-id');
  const left$ = Path(node$, 'node.position.0');
  const top$ = Path(node$, 'node.position.1');
  const z$ = Path(node$, 'node.zindex');
  const id$ = Id();
  const container$ = Element(ClassName(id$));
  const draggable$ = Draggable(container$, {}, undefined, '.node-view');
  newNodePosition.chain(All(Path<Node>(node$, 'node'), draggable$));
  const line$ = Line(Path(node$, 'node')).then(Void());
  const node = Primitive(node$);
  const clicked$ = ClickWithoutDrag(container$);
  clicked$.then(e => {
    activeNodeId$.use({ id: node.primitiveWithException().data().id });
  });
  return Connected<string>(
    Template(
      t =>
        html`<div
          class="node-view select-none absolute ${t.escaped(id$)} node-id-${t.escaped(
          Path(node$, 'node.id')
        )}"
          style="left: ${t.escaped(left$)}px;top: ${t.escaped(top$)}px;z-index: ${t.escaped(z$)}"
        >
          ${t.raw(Path(node$, 'template'))}
        </div>`
    ),
    container$,
    draggable$,
    line$,
    clicked$
  );
}
