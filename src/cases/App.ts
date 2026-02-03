import { partial } from "lodash-es";
import { Late } from "silentium";
import { Template } from "silentium-components";
import { Render } from "silentium-morphdom";
import { Button, html, Textarea } from "silentium-ui";
import { Element } from "silentium-web-api";
import { CapacitorPlatform } from "../io/CapacitorPlatform";
import { FilePickedFromFS } from "./components/FilePickedFromFS";

/**
 * The main application entrypoint
 */
export function App() {
  const content$ = Late('');
  const platform$ = CapacitorPlatform();
  const openFile$ = Late();
  openFile$.then(partial(FilePickedFromFS, platform$, content$));
  return Render(
    Element("body .app"),
    Template(
      (t) =>
        html`<div class="container mx-auto px-3 py-3 h-full flex flex-col">
            <div class="mb-2">platform: ${t.escaped(platform$)}</div>
            <div class="mb-2">
              ${t.raw(Button('Open folder', 'btn', openFile$))}
            </div>
            <div>
              ${t.raw(Textarea(content$, 'w-full border-1 h-[400px]'))}
            </div>
        </div>`,
    ),
  );
}
