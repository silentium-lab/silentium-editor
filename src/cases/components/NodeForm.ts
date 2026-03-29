import { Connected, Late, MessageSourceType, MessageType, Of, Value } from "silentium";
import { Part, Polling, Template } from "silentium-components";
import { html, Input } from "silentium-ui";
import { TheNode } from "../../domain/Node";
import { Tr } from "../../io/Translation";

export function NodeForm(
    object$: MessageSourceType<TheNode>,
    saved$: MessageType<boolean>
) {
    const local$ = Late<TheNode>();
    const name$ = Part<string>(local$, 'name');
    const sub = object$.then(type => {
        local$.use(type);
    });

    Polling(Of(Value(local$)), saved$).then(object => {
        object$.use(object.value);
    });

    return Connected<string>(
        Template(
            t =>
                html`<div>
          <div class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Name'))} </b>
              <span class="block"> ${t.raw(Input(name$))} </span>
            </label>
          </div>
        </div>`
        ),
        sub
    );
}
