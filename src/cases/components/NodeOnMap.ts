import { Connected, MessageType } from "silentium";
import { Path, Template } from "silentium-components";
import { ClassName, html, Id } from "silentium-ui";
import { TheNodeWithTemplate } from "../../domain/Node";
import { Element } from "silentium-web-api";
import { Draggable } from "../../io/Draggable";

export function NodeOnMap(node$: MessageType<TheNodeWithTemplate>) {
    const top$ = Path(node$, 'node.position.0');
    const left$ = Path(node$, 'node.position.1');
    const id$ = Id();
    const container$ = Element(ClassName(id$));
    const draggable$ = Draggable(container$);
    return Connected(Template((t) => html`<div class="absolute select-none ${t.escaped(id$)}" style="left: ${t.escaped(left$)}px;top: ${t.escaped(top$)}px">
        ${t.raw(Path(node$, 'template'))}
    </div>`), draggable$)
}
