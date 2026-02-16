import { All, Connected, MessageType, SourceType } from 'silentium';
import { Path, Template } from 'silentium-components';
import { ClassName, html, Id } from 'silentium-ui';
import { TheNode, TheNodeWithTemplate } from '../../domain/Node';
import { Element } from 'silentium-web-api';
import { Draggable } from '../../io/Draggable';
import { ThePosition } from '../../domain/Position';

export function NodeOnMap(
  newNodePosition: SourceType<[TheNode, ThePosition]>,
  node$: MessageType<TheNodeWithTemplate>
) {
  const top$ = Path(node$, 'node.position.0');
  const left$ = Path(node$, 'node.position.1');
  const id$ = Id();
  const container$ = Element(ClassName(id$));
  const draggable$ = Draggable(container$);
  newNodePosition.chain(All(Path<TheNode>(node$, 'node'), draggable$));
  return Connected(
    Template(
      t =>
        html`<div
          class="absolute select-none ${t.escaped(id$)}"
          style="left: ${t.escaped(left$)}px;top: ${t.escaped(top$)}px"
        >
          ${t.raw(Path(node$, 'template'))}
        </div>`
    ),
    draggable$
  );
}
