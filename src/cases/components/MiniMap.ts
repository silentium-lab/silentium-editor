import { All, Applied, Context, MessageType } from 'silentium';
import { Task, Template } from 'silentium-components';
import { ClassName, html, Id } from 'silentium-ui';
import { ThePoint } from '../../domain/Point';
import { ElementGeometry } from '../../io/ElementGeometry';
import { Element } from 'silentium-web-api';
import { TheMap } from '../../domain/Map';

const scale = 130 / 3000;

export function MiniMap(map$: MessageType<TheMap>) {
  const canvasPosition$ = Context<ThePoint>('canvas-position');
  const canvasRect$ = Applied(ElementGeometry('.nodes-view'), rect => {
    return {
      width: rect.width * scale,
      height: rect.height * scale,
    };
  });
  const id$ = Id();
  const preview$ = Element(ClassName(id$));
  Task(All(preview$, canvasPosition$, canvasRect$)).then(([preview, position, rect]) => {
    preview.style.transform = `translate(${position.x * scale}px, ${position.y * scale}px)`;
    preview.style.width = `${rect.width}px`;
    preview.style.height = `${rect.height}px`;
  });
  return Template(
    t =>
      html`<div class="overflow-hidden relative w-full h-[128px]">
        <div
          class="minimap-preview ${t.raw(id$)} opacity-75 bg-primary border-primary border-solid"
        ></div>
        ${t.raw(
          Applied(map$, map =>
            Object.values(map.objects)
              .map(
                object =>
                  html`<div
                    class="bg-red-500 absolute top-0 left-0 opacity-75"
                    style="width: ${object.width * scale}px; height: ${object.height *
                    scale}px;transform: translate(${object.position[0] * scale}px,${object
                      .position[1] * scale}px)"
                  ></div>`
              )
              .join('')
          )
        )}
      </div>`
  );
}
