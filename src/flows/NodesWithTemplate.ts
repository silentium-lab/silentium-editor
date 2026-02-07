import { MessageType, Of } from "silentium";
import { Map } from "../domain/Map";
import { NodeWithTemplate } from "../domain/Node";
import { Path } from "silentium-components";

export function NodesWithTemplate(map$: MessageType<Map>): MessageType<NodeWithTemplate[]> {
    const objects$ = Path(map$, 'objects')
    return Of([])
}
