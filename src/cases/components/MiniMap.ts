import { All, Applied, Connected, Context } from 'silentium';
import { Task, Template } from 'silentium-components';
import { ClassName, html, Id, Mount } from 'silentium-ui';
import { Element } from 'silentium-web-api';
import { ThePoint } from '../../domain/Point';
import { MapModel } from '../../flows/MapModel';
import { ElementGeometry } from '../../io/ElementGeometry';

const scale = 130 / 3000;

export function MiniMap(this: MapModel) {
  const canvasPosition$ = Context<ThePoint>('canvas-position');
  const canvasRect$ = Applied(ElementGeometry('.nodes-view'), rect => {
    return {
      width: rect.width * scale,
      height: rect.height * scale,
    };
  });
  const id$ = Id();
  const preview$ = Element(ClassName(id$));
  const mapPositionDeps$ = Task(All(preview$, canvasPosition$, canvasRect$));
  mapPositionDeps$.then(([preview, position, rect]) => {
    preview.style.transform = `translate(${position.x * scale}px, ${position.y * scale}px)`;
    preview.style.width = `${rect.width}px`;
    preview.style.height = `${rect.height}px`;
  });
  return Connected<string>(
    Template(
      t =>
        html`<div class="overflow-hidden relative w-full h-[128px]">
          <div
            class="minimap-preview ${t.raw(id$)} opacity-75 bg-primary border-primary border-solid"
          ></div>
          ${t.raw(
            Mount(
              Applied(
                this.message(),
                map =>
                  `<div class="mini-elements">${Object.values(map.objects)
                    .map(
                      object =>
                        html`<div
                          class="bg-red-500 absolute top-0 left-0 opacity-75"
                          style="width: ${object.width * scale}px; height: ${object.height *
                          scale}px;transform: translate(${object.position[0] * scale}px,${object
                            .position[1] * scale}px)"
                        ></div>`
                    )
                    .join('')}</div>`
              )
            )
          )}
        </div>`
    ),
    mapPositionDeps$
  );
}
