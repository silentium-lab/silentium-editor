import { MessageSourceType } from "silentium";
import { Template } from "silentium-components";
import { Button, html } from "silentium-ui";
import { Tr } from "../../io/Translation";

export function MainPage(openFile$: MessageSourceType) {
    return Template(
        (t) =>
            html`<div class="container mx-auto px-3 py-3 h-full flex flex-col">
            <div class="mb-2">${t.raw(Tr('Choose the file to edit'))}</div>
            <div class="mb-2">
              ${t.raw(Button(Tr('Open folder'), 'btn', openFile$))}
            </div>
        </div>`,
    );
}
