import { JSONSource } from '@/io/JSONSource';
import { ScrollByDrag } from '@/io/ScrollByDrag';
import { $appStore, $mapStore, mapDispatch } from '@/store';
import { TheMap } from '@/types/Map';
import '@/views/components/NavigationPanelLit';
import '@/views/components/TypesPanelLit';
import '@/views/components/TypeNewLit';
import '@/views/components/SettingsLit';
import '@/views/components/RelationLit';
import '@/views/components/NodesViewLit';
import '@/views/components/RullerXLit';
import '@/views/components/RullerYLit';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {
  Context,
  ContextChain,
  ContextOf,
  Filtered,
  Late,
  Local,
  SourceComputed,
  Void,
} from 'silentium';
import { Part } from 'silentium-components';
import { ClassName, Id } from 'silentium-ui';
import { Element } from 'silentium-web-api';

@customElement('edit-page-lit')
export class EditPageLit extends LitElement {
  public constructor() {
    super();
    const content$ = Context<string>('active-content');
    const localContent$ = Local(content$);
    const files$ = JSONSource<Record<string, any>>(
      SourceComputed(Filtered<string>(localContent$, Boolean), content$)
    );
    const mapName$ = Late('current');
    ContextOf('active-map-name').then(ContextChain(mapName$));
    const mapPart = Part<TheMap>(files$, mapName$);
    mapPart.then(map => {
      mapDispatch(state => {
        return map;
      });
    });

    $mapStore.subscribe(state => {
      mapPart.use(state);
    });

    const canvasId$ = Id();
    const dragPosition$ = Late({ x: 0, y: 0 });
    dragPosition$.then(position => {
      $appStore.set({
        ...$appStore.get(),
        position: [position.x, position.y],
      });
    });
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
      <div class="col-span-2 p-2 bg-secondary overflow-hidden">
        <navigation-panel-lit></navigation-panel-lit>
      </div>
      <div class="flex flex-col w-40 relative bg-secondary">
        <types-panel-lit></types-panel-lit>
        <div class="flex gap-2 px-2 mt-auto">
          <type-new-lit></type-new-lit>
          <settings-lit></settings-lit>
        </div>
        <relation-lit></relation-lit>
      </div>
      <div
        class="absolute pointer-events-none bottom-2 right-2 w-26 h-26 border z-10 bg-base select-none"
      >
        <mini-map-lit></mini-map-lit>
      </div>
      <div class="nodes-view overflow-hidden bg-base-inverse relative min-w-0 min-h-0">
        <nodes-view-lit></nodes-view-lit>
        <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>
          <ruller-x-lit></ruller-x-lit>
          <ruller-y-lit></ruller-y-lit>
        </div>
      </div>
      <node-modal-lit></node-modal-lit>
      <arrows-area-lit></arrows-area-lit>
    </div>`;
  }
}
