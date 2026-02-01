import { Late, Of } from "silentium";
import { Template } from "silentium-components";
import { Render } from "silentium-morphdom";
import { Button, html } from "silentium-ui";
import { Element } from "silentium-web-api";
import { CapacitorPlatform } from "../io/CapacitorPlatform";

/**
 * Application main entrypoint
 */
export function App() {
  const $openFolder = Late();
  const $platform = CapacitorPlatform();
  $openFolder.then(console.log);
  return Render(
    Element(Of("body .app")),
    Template(
      (t) =>
        html`<div class="container mx-auto px-3 h-full flex flex-col">
            <div>${t.escaped($platform)}</div>
            <p>Open folder</p>
            ${t.raw(Button('Open folder', '', $openFolder))}
        </div>`,
    ),
  );
}
