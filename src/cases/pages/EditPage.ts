import { Connected, Late, MessageSourceType } from "silentium";
import { Part, Template } from "silentium-components";
import { JSONSource } from "../../io/JSONSource";
import { TypesPanel } from "../components/TypesPanel";
import { TheNodeType } from "../../domain/NodeType";
import { NavigationPanel } from "../components/NavigationPanel";
import { MiniMap } from "../components/MiniMap";
import { NodesView } from "../components/NodesView";
import { TheMap } from "../../domain/Map";
import { MapSize } from "../../domain/MapSize";
import { ClassName, Id } from "silentium-ui";
import { ScrollByDrag } from "../../io/ScrollByDrag";
import { Element } from "silentium-web-api";

export function EditPage(content$: MessageSourceType<string>) {
    const files$ = JSONSource<object>(content$);
    const mapName$ = Late('current');
    const map$ = Part<TheMap>(files$, mapName$);
    const types$ = Part<Record<string, TheNodeType>>(map$, 'types');
    const canvasId$ = Id();
    const scrollable$ = ScrollByDrag(Element(ClassName(canvasId$)));
    return Connected(Template((t) => `<div class="bg-base-inverse grid grid-rows-[50px_1fr] grid-cols-[200px_1fr] h-screen">
        <div class="col-span-2 bg-secondary">${t.raw(NavigationPanel())}</div>
        <div class="w-40 relative z-10 bg-secondary">${t.raw(TypesPanel(types$))}</div>
        <div class="absolute pointer-events-none bottom-2 right-2 w-26 h-26 border z-50 bg-base">${t.raw(MiniMap())}</div>
        <div class="${t.escaped(canvasId$)} overflow-hidden mt-2 ml-2 bg-base relative min-w-0 min-h-0">${t.raw(NodesView(map$, MapSize()))}</div>
    </div>`), scrollable$);
}
