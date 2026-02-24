import { All, Context, Of } from 'silentium';
import { ClassName, html, Id } from 'silentium-ui';
import { ThePoint } from '../../domain/Point';
import { Element } from 'silentium-web-api';
import { Task, Template } from 'silentium-components';

export function RulerX() {
  const canvasPosition$ = Context<ThePoint>('canvas-position');
  const id$ = Id();
  const ruler$ = Element(ClassName(id$));
  Task(All(ruler$, canvasPosition$)).then(([ruler, position]) => {
    ruler.style.transform = `translate(${-position.x}px, 0px)`;
  });
  return Template(
    t =>
      html`<div
        class="${t.raw(
          id$
        )} absolute flex top-0 left-0 w-[3000px] z-20 h-4 border-b bg-base text-right text-border text-sm px-2"
        style="transform: translate(0px, 0px);"
      >
        <span class="flex-1 text-body-dark">300px</span>
        <span class="flex-1 text-body-dark">600px</span>
        <span class="flex-1 text-body-dark">900px</span>
        <span class="flex-1 text-body-dark">1200px</span>
        <span class="flex-1 text-body-dark">1500px</span>
        <span class="flex-1 text-body-dark">1800px</span>
        <span class="flex-1 text-body-dark">2100px</span>
        <span class="flex-1 text-body-dark">2400px</span>
        <span class="flex-1 text-body-dark">2700px</span>
        <span class="flex-1 text-body-dark">3000px</span>
      </div>`
  );
}
