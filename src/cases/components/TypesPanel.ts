import { Computed, Connected, Context, Late, Map, Value } from 'silentium';
import { Path, Template } from 'silentium-components';
import { html } from 'silentium-ui';
import { NodeType } from '../../domain/NodeType';
import { NodeTypeCompatibility } from '../../domain/NodeTypeCompatibility';
import { ThePoint } from '../../domain/Point';
import { Position } from '../../domain/Position';
import { MapModel } from '../../flows/MapModel';
import { TypeView } from './TypeView';

export function TypesPanel(mapModel: MapModel) {
  const types$ = Path(mapModel.message(), 'types');
  const typesList$ = Computed(
    t => t.map(NodeTypeCompatibility),
    Computed(Object.entries<NodeType>, types$)
  );
  const newNode$ = Late<[NodeType, Position]>();
  const canvasPosition$ = Value(Context<ThePoint>('canvas-position'));
  newNode$.then(([type, position]) => {
    mapModel.addNode(type, [
      position[0] + canvasPosition$.value.x - 200,
      position[1] + canvasPosition$.value.y + 40,
    ]);
  });
  return Connected<string>(
    Template(
      t => html`
        <div class="types-panel flex flex-col gap-4 relative px-2 z-10">
          ${t.raw(
        Computed(
          arr => arr.join(''),
          Map(typesList$, t => TypeView(newNode$, t))
        )
      )}
        </div>
      `
    ),
    newNode$
  );
}
