import { Applied, Late, MessageSourceType, MessageType, Value } from "silentium";
import { Template } from "silentium-components";
import { html } from "silentium-ui";
import { Tr } from "../../io/Translation";

export function NodeVariables(arrows$: MessageSourceType<Record<string, string>) {
    const deleted$ = Late<string>();
    const arrows = Value(arrows$);
    deleted$.then(id => {
        arrows$.use([...(arrows.value ?? []).filter(arrow => arrow.id !== id)]);
    });
    return Template(
        t =>
            html`<div>
        ${t.raw(
                Applied(Map(arrows$, NodeVariable.bind(null, deleted$)), arr =>
                    arr.length ? arr.join('') : '-'
                )
            )}
      </div>`
    );
}

function NodeVariable(deleted$: MessageSourceType<string>, arrow: MessageType<[string, string]>) {
    const currentArrow = Value(arrow);
    const clicked = Late();
    clicked.then(() => {
        if (currentArrow.value) {
            deleted$.use(currentArrow.value.id);
        }
    });
    return Template(
        t =>
            html`<div class="mb-1">
        ${t.escaped(Tr('Relation with'))} #${t.escaped(Path(arrow, 'id'))}
        ${t.raw(
                Button('&times;', 'btn h-5 w-5 p-0 inline-flex justify-center items-center', clicked)
            )}
      </div>`
    );
}
