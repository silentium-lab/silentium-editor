import { All, Connected, Late, MessageType, Of, SourceType } from 'silentium';
import { TheNodeType } from '../../domain/NodeType';
import { Path, Template } from 'silentium-components';
import { ClassName, html, Id } from 'silentium-ui';
import { Element } from 'silentium-web-api';
import { Draggable } from '../../io/Draggable';
import { ThePosition } from '../../domain/Position';

export function TypeView(
  newType: SourceType<[TheNodeType, ThePosition]>,
  type: MessageType<TheNodeType>
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
    draggablePosition$
  );
  draggable$.then(v => {
    draggablePosition$.use([0, 0]);
  });
  newType.chain(All(type, draggable$));
  return Connected(
    Template(
      t =>
        html`<article class="select-none">
          <h2 class="mb-2">${t.escaped(Path(type, 'name'))}</h2>
          <div class="relative">
            <div class="${t.escaped(id$)} z-80">${t.raw(markup$)}</div>
            <div class="absolute top-0 left-0 z-1 w-full">${t.raw(markup$)}</div>
          </div>
        </article>`
    ),
    draggable$
  );
}
