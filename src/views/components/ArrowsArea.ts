import { All, Connected, Local, MessageType } from 'silentium';
import { Template } from 'silentium-components';
import { ClassName, html, Id } from 'silentium-ui';
import { ThePoint } from '@/types/Point';
import { Element } from 'silentium-web-api';

export function ArrowsArea(dragPosition$: MessageType<ThePoint>) {
  const localDragPosition$ = Local(dragPosition$);
  const id$ = Id();
  const container$ = Element(ClassName(id$));
  All(container$, localDragPosition$).then(([el, position]) => {
    el.style.transform = `translate(${-position.x}px, ${-position.y}px)`;
  });
  return Connected<string>(
    Template(
      t =>
        html`<div
          class="arrows-area ${t.escaped(id$)} z-0"
          style="transform: translate(0px, 0px);"
        ></div>`
    ),
    container$,
    localDragPosition$
  );
}
