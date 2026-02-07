import { MessageSourceType } from "silentium";
import { Template } from "silentium-components";
import { Button, html } from "silentium-ui";
import { lang$, Tr } from "../../io/Translation";

export function MainPage(openFile$: MessageSourceType) {
    return Template(
        (t) =>
            html`<div class="container mx-auto px-3 py-3 h-full flex flex-col">
            <div class="mb-2">${t.raw(Tr('Choose the file to edit'))}</div>
            <div class="mb-2">
              ${t.raw(Button(Tr('Open file'), 'btn', openFile$))}
            </div>
            <div class="flex gap-2">
                ${t.raw(Button('English', 'btn', lang$, '', 'en'))}
                ${t.raw(Button('Русский', 'btn', lang$, '', 'ru'))}
            </div>
        </div>`,
    );
}
