import { All, Connected, MessageType } from 'silentium';
import { Template } from 'silentium-components';
import { ClassName, html, Id } from 'silentium-ui';
import { ThePoint } from '../../domain/Point';
import { Element } from 'silentium-web-api';

export function ArrowsArea(dragPosition$: MessageType<ThePoint>) {
  const id$ = Id();
  const container$ = Element(ClassName(id$));
  All(container$, dragPosition$).then(([el, position]) => {
    el.style.transform = `translate(${-position.x}px, ${-position.y}px)`;
  });
  return Connected(
    Template(
      t =>
        html`<div
          class="arrows-area ${t.escaped(id$)} z-0"
          style="transform: translate(0px, 0px);"
        ></div>`
    ),
    container$
  );
}
