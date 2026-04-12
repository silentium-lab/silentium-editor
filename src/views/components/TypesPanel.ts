import { Applied, Computed, Connected, Context, Late, Map, Primitive } from 'silentium';
import { Template } from 'silentium-components';
import { html } from 'silentium-ui';
import { NodeTypeEntity } from '@/entities/NodeTypeEntity';
import { ThePoint } from '@/entities/Point';
import { Position } from '@/entities/Position';
import { MapModel } from '@/models/MapModel';
import { TypeView } from '@/views/components/TypeView';

export function TypesPanel(map: MapModel) {
  const types$ = Applied(map.message(), (m) => m.types());
  const newNode$ = Late<[NodeTypeEntity, Position]>();
  const canvasPosition$ = Primitive(Context<ThePoint>('canvas-position'));
  newNode$.then(([type, position]) => {
    map.addNode(type, [
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
          Map(types$, t => TypeView(newNode$, t))
        )
      )}
        </div>
      `
    ),
    newNode$
  );
}
