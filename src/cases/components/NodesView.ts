import { Actual, Applied, Late, Map, MaybeMessage, MessageSourceType, Value } from 'silentium';
import { Path, Template } from 'silentium-components';
import { html } from 'silentium-ui';
import { TheMap } from '../../domain/Map';
import { TheNode } from '../../domain/Node';
import { ThePosition } from '../../domain/Position';
import { TheSize } from '../../domain/Size';
import { NodesWithTemplate } from '../../flows/NodesWithTemplate';
import { NodeOnMap } from './NodeOnMap';

export function NodesView(map$: MessageSourceType<TheMap>, mapSize: MaybeMessage<TheSize>) {
  const templates$ = NodesWithTemplate(map$);
  const mapSize$ = Actual(mapSize);
  const newNodePosition$ = Late<[TheNode, ThePosition]>();
  const map = Value(map$);
  // TODO think about immutable.js
  newNodePosition$.then(([node, position]) => {
    map$.use({
      ...map.value,
      objects: {
        ...map.value.objects,
        [node.id]: {
          ...node,
          position,
        },
      },
    });
  });
  return Template(
    t =>
      html`<div
        class="relative background-grid"
        style="width: ${t.escaped(Path(mapSize$, 'width'))}px; height: ${t.escaped(
          Path(mapSize$, 'height')
        )}px"
      >
        ${t.raw(
          Applied(
            Map(templates$, item => NodeOnMap(newNodePosition$, item)),
            v => v.join('')
          )
        )}
      </div>`
  );
}
