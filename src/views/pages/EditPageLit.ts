import { JSONSource } from '@/io/JSONSource';
import { ScrollByDrag } from '@/io/ScrollByDrag';
import { MapEntity } from '@/models/MapEntity';
import { MapStream } from '@/models/MapStream';
import { TheMap } from '@/types/Map';
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { All, Applied, Context, ContextChain, ContextOf, Filtered, Late, Local, SourceComputed, Void } from 'silentium';
import { Part } from 'silentium-components';
import { ClassName, Id } from 'silentium-ui';
import { Element } from 'silentium-web-api';
import '@/views/components/NavigationPanelLit';
import '@/views/components/TypesPanelLit';

@customElement('edit-page-lit')
export class EditPageLit extends LitElement {
  @state()
  public map!: MapEntity;

  @state()
  public mapStream: MapStream;

  public constructor() {
    super();
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
    const map$ = SourceComputed<TheMap>(Applied(All(files$, mapName$), ([files, mapName]) => {
      if (files[mapName] !== undefined) {
        return files[mapName];
      }
      return MapEntity.emptyMap(mapName, files['current']).data();
    }), mapPart);
    this.mapStream = new MapStream(map$);
    this.mapStream.message().then((map) => {
      this.map = map;
    })

    ContextOf('map').then(ContextChain(map$));

    const canvasId$ = Id();
    const dragPosition$ = Late({ x: 0, y: 0 });
    ContextOf('canvas-position').then(ContextChain(dragPosition$));
    const scrollable$ = ScrollByDrag(Element(ClassName(canvasId$)), dragPosition$);
    scrollable$.then(Void());
  }

  public createRenderRoot() {
    return this;
  }

  public render() {
    return html`<div
          class="bg-base-inverse grid grid-rows-[50px_1fr] grid-cols-[200px_1fr] overflow-hidden h-screen"
        >
          <div class="col-span-2 p-2 bg-secondary z-10 overflow-hidden">
            <navigation-panel-lit .map="${this.map}"></navigation-panel-lit>
          </div>
          <div class="flex flex-col w-40 relative z-10 bg-secondary">
            <types-panel-lit .map="${this.mapStream}"></types-panel-lit>
            <div class="flex gap-2 px-2 mt-auto">
              <type-new-lit></type-new-lit>
              <settings-lit></settings-lit>
            </div>
            <relation-lit></relation-lit>
          </div>
          <div
            class="absolute pointer-events-none bottom-2 right-2 w-26 h-26 border z-50 bg-base select-none"
          >
            <mini-map-lit></mini-map-lit>
          </div>
          <div
            class="nodes-view overflow-hidden bg-base-inverse relative min-w-0 min-h-0"
          >
            <nodes-view-lit></nodes-view-lit>
            <div class="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
              <div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>
              <ruller-x-lit></ruller-x-lit>
              <ruller-y-lit></ruller-y-lit>
            </div>
          </div>
          <node-modal-lit></node-modal-lit>
          <arrows-area-lit></arrows-area-lit>
          <node-type-modal-lit></node-type-modal-lit>
        </div>`;
  }
}
