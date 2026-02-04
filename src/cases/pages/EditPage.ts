import { Late, MessageSourceType } from "silentium";
import { Part, Template } from "silentium-components";
import { JSONSource } from "../../io/JSONSource";
import { TypesPanel } from "../components/TypesPanel";
import { NodeType } from "../../domain/NodeType";
import { NavigationPanel } from "../components/NavigationPanel";
import { MiniMap } from "../components/MiniMap";
import { ObjectsView } from "../components/ObjectsView";

export function EditPage(content$: MessageSourceType<string>) {
    const files$ = JSONSource<object>(content$);
    const mapName$ = Late('current');
    const map$ = Part<object>(files$, mapName$);
    const types$ = Part<NodeType[]>(map$, 'types')
    return Template((t) => `<div>
        <p>Edit page!</p>
        <div>${t.raw(NavigationPanel())}</div>
        <div>${t.raw(TypesPanel(types$))}</div>
        <div>map name: ${t.escaped(mapName$)}</div>
        <div>${t.raw(MiniMap())}</div>
        <div>${t.raw(ObjectsView())}</div>
    </div>`);
}
