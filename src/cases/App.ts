import { Late, Lazy, Of } from "silentium";
import { Switch, Template } from "silentium-components";
import { Render } from "silentium-morphdom";
import { Button, html, Textarea } from "silentium-ui";
import { Element } from "silentium-web-api";
import { CapacitorPlatform } from "../io/CapacitorPlatform";
import { FileFromWeb } from "../io/FileFromWeb";
import { Platform } from "../features/Platform";
import { FileFromAndroid } from "../io/FileFromAndroid";

/**
 * The main application entrypoint
 */
export function App() {
  const openFile$ = Late();
  const platform$ = CapacitorPlatform();
  const content$ = Late('');
  openFile$.then(() => {
    const file$ = Switch<string, Platform>(platform$, [
      ['android', Lazy(() => FileFromAndroid(content$))],
      ['web', Lazy(() => FileFromWeb(content$))],
    ]);
    content$.chain(file$);
  });
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
