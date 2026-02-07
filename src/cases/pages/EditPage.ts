import { Late, MessageSourceType } from "silentium";
import { Part, Template } from "silentium-components";
import { JSONSource } from "../../io/JSONSource";
import { TypesPanel } from "../components/TypesPanel";
import { NodeType } from "../../domain/NodeType";
import { NavigationPanel } from "../components/NavigationPanel";
import { MiniMap } from "../components/MiniMap";
import { ObjectsView } from "../components/ObjectsView";
import { Map } from "../../domain/Map";

export function EditPage(content$: MessageSourceType<string>) {
    const files$ = JSONSource<object>(content$);
    const mapName$ = Late('current');
    const map$ = Part<Map>(files$, mapName$);
    const types$ = Part<NodeType[]>(map$, 'types')
    return Template((t) => `<div>
        <div>${t.raw(NavigationPanel())}</div>
        <div>${t.raw(TypesPanel(types$))}</div>
        <div>map name: ${t.escaped(mapName$)}</div>
        <div>${t.raw(MiniMap())}</div>
        <div>${t.raw(ObjectsView(map$))}</div>
    </div>`);
}
