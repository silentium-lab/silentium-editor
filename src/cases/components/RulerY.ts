import { Of } from 'silentium';
import { html } from 'silentium-ui';

export function RulerY() {
  return Of(
    html`<div
      class="sticky flex [writing-mode:vertical-lr] top-0 left-0 ml-n2 h-full bg-base z-20 w-4 text-left text-sm py-2"
      style="transform: translate(0px, 0px);"
    >
      <span class="flex-1 text-body-dark">300px</span
      ><span class="flex-1 text-body-dark">600px</span
      ><span class="flex-1 text-body-dark">900px</span
      ><span class="flex-1 text-body-dark">1200px</span
      ><span class="flex-1 text-body-dark">1500px</span
      ><span class="flex-1 text-body-dark">1800px</span
      ><span class="flex-1 text-body-dark">2100px</span
      ><span class="flex-1 text-body-dark">2400px</span
      ><span class="flex-1 text-body-dark">2700px</span
      ><span class="flex-1 text-body-dark">3000px</span>
    </div>`
  );
}
