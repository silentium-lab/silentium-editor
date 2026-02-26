import { All, Connected, Context, MessageType, SourceType, Value, Void } from 'silentium';
import { Path, Template } from 'silentium-components';
import { ClassName, Clicked, html, Id } from 'silentium-ui';
import { TheNode, TheNodeWithTemplate } from '../../domain/Node';
import { Element } from 'silentium-web-api';
import { Draggable } from '../../io/Draggable';
import { ThePosition } from '../../domain/Position';
import { Line } from '../../io/Line';

export function NodeOnMap(
  newNodePosition: SourceType<[TheNode, ThePosition]>,
  node$: MessageType<TheNodeWithTemplate>
) {
  const activeNodeId$ = Context('active-node-id');
  const left$ = Path(node$, 'node.position.0');
  const top$ = Path(node$, 'node.position.1');
  const id$ = Id();
  const container$ = Element(ClassName(id$));
  const draggable$ = Draggable(container$, {}, undefined, '.node-view');
  newNodePosition.chain(All(Path<TheNode>(node$, 'node'), draggable$));
  const line$ = Line(Path(node$, 'node')).then(Void());
  const nodeId$ = Value(Path(node$, 'id'));
  const clicked$ = Clicked(ClassName(id$));
  clicked$.then(() => {
    activeNodeId$.use(nodeId$.value);
  });
  return Connected(
    Template(
      t =>
        html`<div
          class="node-view absolute ${t.escaped(id$)} node-id-${t.escaped(Path(node$, 'node.id'))}"
          style="left: ${t.escaped(left$)}px;top: ${t.escaped(top$)}px"
        >
          ${t.raw(Path(node$, 'template'))}
        </div>`
    ),
    draggable$,
    line$
  );
}
