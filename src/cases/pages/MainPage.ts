import { MessageSourceType } from "silentium";
import { Template } from "silentium-components";
import { Button, html, Textarea } from "silentium-ui";

export function MainPage(openFile$: MessageSourceType) {
    return Template(
        (t) =>
            html`<div class="container mx-auto px-3 py-3 h-full flex flex-col">
            <div class="mb-2">Choose the file to edit</div>
            <div class="mb-2">
              ${t.raw(Button('Open folder', 'btn', openFile$))}
            </div>
        </div>`,
    );
}
