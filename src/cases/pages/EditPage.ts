import {
  Connected,
  ContextChain,
  ContextOf,
  Filtered,
  Late,
  Local,
  MessageSourceType,
  MessageType,
  SourceComputed
} from 'silentium';
import { Part, Task, Template } from 'silentium-components';
import { ClassName, html, Id, Mount, MountPoint } from 'silentium-ui';
import { Element } from 'silentium-web-api';
import { Map } from '../../domain/Map';
import { MapSize } from '../../domain/MapSize';
import { MapModel } from '../../flows/MapModel';
import { JSONSource } from '../../io/JSONSource';
import { ScrollByDrag } from '../../io/ScrollByDrag';
import { ArrowsArea } from '../components/ArrowsArea';
import { MiniMap } from '../components/MiniMap';
import { NavigationPanel } from '../components/NavigationPanel';
import { NodeModal } from '../components/NodeModal';
import { NodesView } from '../components/NodesView';
import { NodeTypeModal } from '../components/NodeTypeModal';
import { Relation } from '../components/Relation';
import { RulerX } from '../components/RulerX';
import { RulerY } from '../components/RulerY';
import { Settings } from '../components/Settings';
import { TypeNew } from '../components/TypeNew';
import { TypesPanel } from '../components/TypesPanel';
import { Application } from '../../flows/AppModel';

export function EditPage(this: Application, content$: MessageSourceType<string>): MessageType<string> {
  const localContent$ = Local(content$);
  ContextOf('active-node-id').then(ContextChain(Late()));
  ContextOf('active-node-type-id').then(ContextChain(Late()));
  const files$ = JSONSource<object>(
    SourceComputed(Filtered<string>(localContent$, Boolean), content$)
  );
  const mapName$ = Late('current');
  const map$ = Part<Map>(files$, mapName$);
  this.map().provide(map$);

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
            ${t.raw(NavigationPanel())}
          </div>
          <div class="flex flex-col w-40 relative z-10 bg-secondary">
            ${t.raw(Mount(TypesPanel.call(this.map().get())))}
            <div class="flex gap-2 px-2 mt-auto">
              ${t.raw(TypeNew.call(this.map().get()))}${t.raw(Settings.call(this.map().get()))}
            </div>
            <div class="${t.raw(MountPoint(Relation.call(this.map().get())))}"></div>
          </div>
          <div
            class="absolute pointer-events-none bottom-2 right-2 w-26 h-26 border z-50 bg-base select-none"
          >
            ${t.raw(Mount(MiniMap.call(this.map().get())))}
          </div>
          <div
            class="${t.escaped(
          canvasId$
        )} nodes-view overflow-hidden bg-base-inverse relative min-w-0 min-h-0"
          >
            ${t.raw(Mount(NodesView.call(this.map().get(), MapSize())))}
            <div class="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
              <div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>
              ${t.raw(RulerX())} ${t.raw(RulerY())}
            </div>
          </div>
          ${t.raw(NodeModal.call(this.map().get()))}
          ${t.raw(Mount(Task(ArrowsArea(dragPosition$))))} ${t.raw(NodeTypeModal.call(this.map().get()))}
        </div>`
    ),
    localContent$,
    scrollable$,
  );
}
