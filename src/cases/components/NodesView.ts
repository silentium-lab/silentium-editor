import {
  Actual,
  Applied,
  Connected,
  Late,
  Map,
  MaybeMessage,
  Value
} from 'silentium';
import { Path, Template } from 'silentium-components';
import { html } from 'silentium-ui';
import { TheNode } from '../../domain/Node';
import { ThePosition } from '../../domain/Position';
import { TheSize } from '../../domain/Size';
import { MapModel } from '../../flows/MapModel';
import { NodesWithTemplate } from '../../flows/NodesWithTemplate';
import { NodeOnMap } from './NodeOnMap';

export function NodesView(mapModel: MapModel, mapSize: MaybeMessage<TheSize>) {
  const templates$ = NodesWithTemplate(mapModel.message());
  const mapSize$ = Actual(mapSize);
  const newNodePosition$ = Late<[TheNode, ThePosition]>();
  newNodePosition$.then(([node, position]) => {
    const objectModel = mapModel.object(node.id);
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
