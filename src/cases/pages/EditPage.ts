import {
  Connected,
  ContextChain,
  ContextOf,
  Late,
  MessageSourceType,
  MessageType,
} from 'silentium';
import { Part, Task, Template } from 'silentium-components';
import { ClassName, html, Id, Mount, MountPoint } from 'silentium-ui';
import { Element } from 'silentium-web-api';
import { TheMap } from '../../domain/Map';
import { MapSize } from '../../domain/MapSize';
import { JSONSource } from '../../io/JSONSource';
import { ScrollByDrag } from '../../io/ScrollByDrag';
import { ArrowsArea } from '../components/ArrowsArea';
import { MiniMap } from '../components/MiniMap';
import { NavigationPanel } from '../components/NavigationPanel';
import { NodesView } from '../components/NodesView';
import { TypesPanel } from '../components/TypesPanel';
import { RulerX } from '../components/RulerX';
import { RulerY } from '../components/RulerY';
import { Relation } from '../components/Relation';

export function EditPage(content$: MessageSourceType<string>): MessageType<string> {
  const activeNodeId$ = Late();
  ContextOf('active-node-id').then(ContextChain(activeNodeId$));
  const files$ = JSONSource<object>(content$);
  const mapName$ = Late('current');
  const map$ = Part<TheMap>(files$, mapName$);
  const canvasId$ = Id();
  const dragPosition$ = Late({ x: 0, y: 0 });
  ContextOf('canvas-position').then(ContextChain(dragPosition$));
  const scrollable$ = ScrollByDrag(Element(ClassName(canvasId$)), dragPosition$);
  return Connected(
    Template(
      t =>
        html`<div class="bg-base-inverse grid grid-rows-[50px_1fr] grid-cols-[200px_1fr] h-screen">
          <div class="col-span-2 bg-secondary z-10 overflow-hidden">
            ${t.raw(NavigationPanel())}
          </div>
          <div class="flex flex-col w-40 relative z-10 bg-secondary">
            ${t.raw(Mount(TypesPanel(map$)))}
            <div class="${t.raw(MountPoint(Relation(map$)))} mt-auto"></div>
          </div>
          <div
            class="absolute pointer-events-none bottom-2 right-2 w-26 h-26 border z-50 bg-base select-none"
          >
            ${t.raw(Mount(MiniMap(map$)))}
          </div>
          <div
            class="${t.escaped(
              canvasId$
            )} nodes-view overflow-hidden bg-base-inverse relative min-w-0 min-h-0"
          >
            ${t.raw(Mount(NodesView(map$, MapSize())))}
            <div class="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
              <div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>
              ${t.raw(RulerX())} ${t.raw(RulerY())}
            </div>
          </div>
          ${t.raw(Mount(Task(ArrowsArea(dragPosition$))))}
        </div>`
    ),
    scrollable$
  );
}
