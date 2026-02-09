import { MessageType } from "silentium";
import { Path, Template } from "silentium-components";
import { html } from "silentium-ui";
import { TheNodeWithTemplate } from "../../domain/Node";

export function NodeOnMap(node$: MessageType<TheNodeWithTemplate>) {
    return Template((t) => html`<div style="">
        ${t.raw(Path(node$, 'template'))}
    </div>`)
}
