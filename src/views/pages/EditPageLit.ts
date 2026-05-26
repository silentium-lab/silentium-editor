import { JSONSource } from '@/io/JSONSource';
import { ScrollByDrag } from '@/io/ScrollByDrag';
import { $appStore, $mapStore, mapDispatch } from '@/store';
import { TheMap } from '@/types/Map';
import '@/views/components/NavigationPanelLit';
import '@/views/components/NodesViewLit';
import '@/views/components/RelationLit';
import '@/views/components/RullerXLit';
import '@/views/components/RullerYLit';
import '@/views/components/SettingsLit';
import '@/views/components/TypeNewLit';
import '@/views/components/TypesPanelLit';
import '@/views/components/ArrowsAreaLit';
import { Observe } from '@/views/controllers/Observe';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {
  Context,
  ContextChain,
  ContextOf,
  DestroyContainer,
  Filtered,
  Late,
  Local,
  SourceComputed,
  Void,
} from 'silentium';
import { Part } from 'silentium-components';
import { ClassName, Id } from 'silentium-ui';
import { Element } from 'silentium-web-api';
import { Behave } from '@/views/controllers/Behave';

@customElement('edit-page-lit')
export class EditPageLit extends LitElement {
  canvasId = Observe(this, Id());
  dc = DestroyContainer();
  dragPosition = Behave(this, Late({ x: 0, y: 0 }));

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

    this.dragPosition.source().then(position => {
      $appStore.set({
        ...$appStore.get(),
        position: [position.x, position.y],
      });
    });
    const canvasEl$ = Element(ClassName(this.canvasId.source()));
    const scrollable$ = ScrollByDrag(canvasEl$, this.dragPosition.source());
    scrollable$.then(Void());
    this.dc.add(scrollable$);
  }

  public createRenderRoot() {
    return this;
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this.dc.destroy();
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
        class="absolute pointer-events-none bottom-2 right-2 w-26 h-26 border z-30 bg-base select-none"
      >
        <mini-map-lit></mini-map-lit>
      </div>
      <div class="${this.canvasId.value} overflow-hidden bg-base-inverse relative min-w-0 min-h-0">
        <div class="nodes-view">
          <nodes-view-lit></nodes-view-lit>
          <arrows-area-lit .dragPosition="${this.dragPosition.value}"></arrows-area-lit>
        </div>
        <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div class="absolute z-30 top-0 left-0 h-[18px] w-[22px] bg-white"></div>
          <ruller-x-lit .dragPosition="${this.dragPosition.value}"></ruller-x-lit>
          <ruller-y-lit .dragPosition="${this.dragPosition.value}"></ruller-y-lit>
        </div>
      </div>
      <node-modal-lit></node-modal-lit>
    </div>`;
  }
}
