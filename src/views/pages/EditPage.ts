import { JSONSource } from '@/io/JSONSource';
import { ScrollByDrag } from '@/io/ScrollByDrag';
import { MapEntity } from '@/models/MapEntity';
import { MapStream } from '@/models/MapStream';
import { TheMap } from '@/types/Map';
import { ArrowsArea } from '@/views/components/ArrowsArea';
import { MiniMap } from '@/views/components/MiniMap';
import { NavigationPanel } from '@/views/components/NavigationPanel';
import '@/views/components/TypesPanelLit';
import '@/views/components/MiniMapLit';
import '@/views/components/NodesViewLit';
import '@/views/components/NodeModalLit';
import '@/views/components/TypeViewLit';
import '@/views/components/SettingsLit';
import '@/views/components/NodeTopNameLit';
import '@/views/components/NodeVariablesLit';
import '@/views/components/NavigationPanelLit';
import { TypesPanelLit } from '@/views/components/TypesPanelLit';
import { NodeModal } from '@/views/components/NodeModal';
import { NodesView } from '@/views/components/NodesView';
import { NodeTypeModal } from '@/views/components/NodeTypeModal';
import { Relation } from '@/views/components/Relation';
import { RulerX } from '@/views/components/RulerX';
import { RulerY } from '@/views/components/RulerY';
import { Settings } from '@/views/components/Settings';
import { TypeNew } from '@/views/components/TypeNew';
import { TypesPanel } from '@/views/components/TypesPanel';
import {
  All,
  Applied,
  Computed,
  Connected,
  Context,
  ContextChain,
  ContextOf,
  Filtered,
  Late,
  Local,
  MessageSourceType,
  MessageType,
  SourceComputed,
} from 'silentium';
import { Part, Task, Template } from 'silentium-components';
import { ClassName, html, Id, Mount, MountPoint } from 'silentium-ui';
import { Element } from 'silentium-web-api';
import '@/views/components/NavigationPanel';

export function EditPage(): MessageType<string> {
  const content$ = Context<string>('active-content');
  const localContent$ = Local(content$);
  ContextOf('active-node-id').then(ContextChain(Late()));
  ContextOf('active-node-type-id').then(ContextChain(Late()));
  const files$ = JSONSource<Record<string, any>>(
    SourceComputed(Filtered<string>(localContent$, Boolean), content$)
  );
  const mapName$ = Late('current');
  ContextOf('active-map-name').then(ContextChain(mapName$));
  const mapPart = Part<TheMap>(files$, mapName$);
  const map$ = SourceComputed<TheMap>(
    Applied(All(files$, mapName$), ([files, mapName]) => {
      if (files[mapName] !== undefined) {
        return files[mapName];
      }
      return MapEntity.emptyMap(mapName, files['current']).data();
    }),
    mapPart
  );
  const mapModel = new MapStream(map$);

  ContextOf('map').then(ContextChain(map$));

  const canvasId$ = Id();
  const dragPosition$ = Late({ x: 0, y: 0 });
  ContextOf('canvas-position').then(ContextChain(dragPosition$));
  const scrollable$ = ScrollByDrag(Element(ClassName(canvasId$)), dragPosition$);

  return Connected(
    Template(
      t =>
        html`<div
          class="bg-base-inverse grid grid-rows-[50px_1fr] grid-cols-[200px_1fr] overflow-hidden h-screen"
        >
          <div class="col-span-2 p-2 bg-secondary z-10 overflow-hidden">
            <navigation-panel-lit></navigation-panel-lit>
            <types-panel-lit></types-panel-lit>
          </div>
          <div class="flex flex-col w-40 relative z-10 bg-secondary">
            ${t.raw(Mount(TypesPanel(mapModel)))}
            <div class="flex gap-2 px-2 mt-auto">
              ${t.raw(TypeNew(mapModel))}${t.raw(Settings(mapModel))}
            </div>
            <div class="${t.raw(MountPoint(Relation(mapModel)))}"></div>
          </div>
          <div
            class="absolute pointer-events-none bottom-2 right-2 w-26 h-26 border z-50 bg-base select-none"
          >
            ${t.raw(Mount(MiniMap(mapModel)))}
          </div>
          <div
            class="${t.escaped(
              canvasId$
            )} nodes-view overflow-hidden bg-base-inverse relative min-w-0 min-h-0"
          >
            ${t.raw(Mount(NodesView(mapModel)))}
            <div class="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
              <div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>
              ${t.raw(RulerX())} ${t.raw(RulerY())}
            </div>
          </div>
          ${t.raw(NodeModal(mapModel))} ${t.raw(Mount(Task(ArrowsArea(dragPosition$), 300)))}
          ${t.raw(NodeTypeModal(mapModel))}
        </div>`
    ),
    localContent$,
    scrollable$
  );
}
