import { Of } from "silentium";
import { Template } from "silentium-components";
import { Render } from "silentium-morphdom";
import { html } from "silentium-ui";

/**
 * Application main entrypoint
 */
export function App(element: HTMLElement) {
  return Render(
    Of(element),
    Template(
      (t) =>
        html`<div class="container mx-auto px-3 h-full flex flex-col">
            Application loaded
        </div>`,
    ),
  );
}
