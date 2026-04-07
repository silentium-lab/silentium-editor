import { All, Connected, Context, Late, MessageType, SourceType, Value } from 'silentium';
import { Path, Task, Template } from 'silentium-components';
import { ClassName, html, Id } from 'silentium-ui';
import { Element } from 'silentium-web-api';
import { NodeType } from '../../domain/NodeType';
import { Position } from '../../domain/Position';
import { ClickWithoutDrag } from '../../io/ClickWithoutDrag';
import { Draggable } from '../../io/Draggable';

export function TypeView(
  newType: SourceType<[NodeType, Position]>,
  type: MessageType<NodeType>
) {
  const markup$ = Path(type, 'markup');
  const id$ = Id();
  const container$ = Element(ClassName(id$));
  const draggablePosition$ = Late<[number, number]>();
  const draggable$ = Draggable(
    container$,
    {
      containment: '.nodes-view',
    },
    draggablePosition$,
    '.node-view'
  );
  Task(draggable$).then(() => {
    draggablePosition$.use([0, 0]);
  });
  newType.chain(All(type, draggable$));
  const activeNodeTypeId$ = Context('active-node-type-id');
  const clicked$ = ClickWithoutDrag(container$);
  const typeId = Value(Path(type, 'id'));
  clicked$.then(() => {
    activeNodeTypeId$.use({ id: typeId.value });
  });
  return Connected(
    Template(
      t =>
        html`<article class="select-none">
          <h2 class="mb-2">${t.escaped(Path(type, 'name'))}</h2>
          <div class="relative">
            <div class="${t.escaped(id$)} node-view select-none z-90">${t.raw(markup$)}</div>
            <div class="absolute top-0 left-0 z-1 w-full select-none">${t.raw(markup$)}</div>
          </div>
        </article>`
    ),
    draggable$,
    clicked$
  );
}
