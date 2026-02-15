import { Connected, MessageType, Of } from "silentium";
import { TheNodeType } from "../../domain/NodeType";
import { Path, Template } from "silentium-components";
import { ClassName, html, Id } from "silentium-ui";
import { Element } from "silentium-web-api";
import { Draggable } from "../../io/Draggable";

export function TypeView(type: MessageType<TheNodeType>) {
    const markup$ = Path(type, 'markup');
    const id$ = Id();
    const container$ = Element(ClassName(id$));
    const draggable$ = Draggable(container$, {});
    return Connected(Template((t) => html`<article class="select-none">
        <h2 class="mb-2">
            ${t.escaped(Path(type, 'name'))}
        </h2>
        <div class="relative">
            <div class="${t.escaped(id$)} z-80">
                ${t.raw(markup$)}
            </div>
            <div class="absolute top-0 left-0 z-1 w-full">
                ${t.raw(markup$)}
            </div>
        </div>
    </article>`), draggable$);
}
