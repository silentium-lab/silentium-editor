import { Applied, MessageType } from "silentium";
import { Template } from "silentium-components";
import { Map } from "../../domain/Map";
import { NodesWithTemplate } from "../../flows/NodesWithTemplate";

export function ObjectsView(map$: MessageType<Map>) {
    const templates$ = NodesWithTemplate(map$);
    return Template(
        (t) => `objects view ${t.escaped(Applied(templates$, JSON.stringify))}`
    );
}
