import {
  Connected,
  ContextChain,
  ContextOf,
  Late,
  MessageSourceType,
  MessageType,
} from 'silentium';
import { Part, Task, Template } from 'silentium-components';
import { ClassName, html, Id, Mount } from 'silentium-ui';
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

export function EditPage(content$: MessageSourceType<string>): MessageType<string> {
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
          <div class="w-40 relative z-10 bg-secondary overflow-hidden">
            ${t.raw(Mount(TypesPanel(map$)))}
          </div>
          <div
            class="absolute pointer-events-none bottom-2 right-2 w-26 h-26 border z-50 bg-base select-none"
          >
            ${t.raw(Mount(MiniMap(map$)))}
          </div>
          <div
            class="${t.escaped(
              canvasId$
            )} nodes-view overflow-hidden mt-2 ml-2 bg-base-inverse relative min-w-0 min-h-0"
          >
            ${t.raw(Mount(NodesView(map$, MapSize())))}
          </div>
          ${t.raw(Mount(Task(ArrowsArea(dragPosition$))))}
        </div>`
    ),
    scrollable$
  );
}
