import { Actual, Applied, Connected, Late, Map, MaybeMessage, Value } from 'silentium';
import { Path, Template } from 'silentium-components';
import { html } from 'silentium-ui';
import { Node } from '../../domain/Node';
import { Position } from '../../domain/Position';
import { TheSize } from '../../domain/Size';
import { MapModel } from '../../flows/MapModel';
import { NodesWithTemplate } from '../../flows/NodesWithTemplate';
import { NodeOnMap } from './NodeOnMap';

export function NodesView(this: MapModel, mapSize: MaybeMessage<TheSize>) {
  const templates$ = NodesWithTemplate(this.message());
  const mapSize$ = Actual(mapSize);
  const newNodePosition$ = Late<[Node, Position]>();
  newNodePosition$.then(([node, position]) => {
    const objectModel = this.node(node.id);
    objectModel.newPosition(position);
  });
  return Connected<string>(
    Template(
      t =>
        html`<div
          class="relative background-grid z-10 mt-4 ml-4"
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
    ),
    newNodePosition$
  );
}
