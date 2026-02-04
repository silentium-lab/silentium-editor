import { Applied, MessageSourceType } from "silentium";
import { NodeType } from "../../domain/NodeType";
import { Template } from "silentium-components";

export function TypesPanel(types$: MessageSourceType<NodeType[]>) {
    return Template((t) => `
        <div>types: ${t.escaped(Applied(types$, JSON.stringify))}</div>
    `);
}
