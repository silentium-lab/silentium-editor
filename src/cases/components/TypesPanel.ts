import { Computed, Connected, Context, Late, Map, Primitive } from 'silentium';
import { Path, Template } from 'silentium-components';
import { html } from 'silentium-ui';
import { NodeType } from '../../domain/NodeType';
import { NodeTypeCompatibility } from '../../domain/NodeTypeCompatibility';
import { ThePoint } from '../../domain/Point';
import { Position } from '../../domain/Position';
import { MapModel } from '../../flows/MapModel';
import { TypeView } from './TypeView';

export function TypesPanel(this: MapModel) {
  const types$ = Path(this.message(), 'types');
  const typesList$ = Computed(
    t => t.map(NodeTypeCompatibility),
    Computed(Object.entries<NodeType>, types$)
  );
  const newNode$ = Late<[NodeType, Position]>();
  const canvasPosition$ = Primitive(Context<ThePoint>('canvas-position'));
  newNode$.then(([type, position]) => {
    this.addNode(type, [
      position[0] + canvasPosition$.primitiveWithException().x - 200,
      position[1] + canvasPosition$.primitiveWithException().y + 40,
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
