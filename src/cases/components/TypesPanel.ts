import { Computed, Map, MessageSourceType } from "silentium";
import { Template } from "silentium-components";
import { html } from "silentium-ui";
import { TheNodeType } from "../../domain/NodeType";
import { NodeTypeCompatibility } from "../../domain/NodeTypeCompatibility";
import { TypeView } from "./TypeView";

export function TypesPanel(types$: MessageSourceType<Record<string, TheNodeType>>) {
    const typesList$ = Computed(
        (t) => t.map(NodeTypeCompatibility),
        Computed(Object.values<TheNodeType>, types$)
    );
    return Template((t) => html`
        <div class="types-panel relative px-2">
            ${t.raw(Map(typesList$, TypeView))}
        </div>
    `);
}
