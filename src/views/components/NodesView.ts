import { Applied, Connected, Late, Map } from 'silentium';
import { Path, Template } from 'silentium-components';
import { html } from 'silentium-ui';
import { TheNode } from '@/types/Node';
import { ThePosition } from '@/types/Position';
import { NodeOnMap } from './NodeOnMap';
import { MapStream } from '@/models/MapStream';

export function NodesView(map: MapStream) {
  const newNodePosition$ = Late<[TheNode, ThePosition]>();
  newNodePosition$.then(([node, position]) => {
    const objectModel = map.node(node.id);
    objectModel.newPosition(position);
  });
  return Connected<string>(
    Template(
      t =>
        html`<div
          class="relative background-grid z-10 mt-4 ml-4"
          style="width: ${t.escaped(Path(map.size(), 'width'))}px; height: ${t.escaped(
            Path(map.size(), 'height')
          )}px"
        >
          ${t.raw(
            Applied(
              Map(map.nodes(), item => NodeOnMap(newNodePosition$, item)),
              v => v.join('')
            )
          )}
        </div>`
    ),
    newNodePosition$
  );
}
