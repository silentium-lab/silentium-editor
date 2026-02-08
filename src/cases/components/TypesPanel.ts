import { Applied, MessageSourceType } from "silentium";
import { TheNodeType } from "../../domain/NodeType";
import { Template } from "silentium-components";

export function TypesPanel(types$: MessageSourceType<TheNodeType[]>) {
    return Template((t) => `
        <div>types: ${t.escaped(Applied(types$, JSON.stringify))}</div>
    `);
}
