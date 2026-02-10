import { MessageType } from "silentium";
import { Path, Template } from "silentium-components";
import { html } from "silentium-ui";
import { TheNodeWithTemplate } from "../../domain/Node";

export function NodeOnMap(node$: MessageType<TheNodeWithTemplate>) {
    const top$ = Path(node$, 'node.position.0');
    const left$ = Path(node$, 'node.position.1');
    return Template((t) => html`<div class="absolute" style="left: ${t.escaped(left$)}px;top: ${t.escaped(top$)}px">
        ${t.raw(Path(node$, 'template'))}
    </div>`)
}
