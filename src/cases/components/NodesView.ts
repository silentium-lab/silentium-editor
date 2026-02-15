import { Actual, Map, MaybeMessage, MessageType } from 'silentium';
import { Path, Template } from 'silentium-components';
import { html } from 'silentium-ui';
import { TheMap } from '../../domain/Map';
import { TheSize } from '../../domain/Size';
import { NodesWithTemplate } from '../../flows/NodesWithTemplate';
import { NodeOnMap } from './NodeOnMap';

export function NodesView(map$: MessageType<TheMap>, mapSize: MaybeMessage<TheSize>) {
  const templates$ = NodesWithTemplate(map$);
  const mapSize$ = Actual(mapSize);
  return Template(
    t =>
      html`<div
        class="relative background-grid"
        style="width: ${t.escaped(Path(mapSize$, 'width'))}px; height: ${t.escaped(
          Path(mapSize$, 'height')
        )}px"
      >
        ${t.raw(Map(templates$, NodeOnMap))}
      </div>`
  );
}
