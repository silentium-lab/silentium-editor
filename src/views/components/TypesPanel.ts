import { Applied, Computed, Connected, Context, Late, Map, Primitive } from 'silentium';
import { Template } from 'silentium-components';
import { html } from 'silentium-ui';
import { NodeTypeCell } from '@/cells/NodeTypeCell';
import { ThePoint } from '@/cells/Point';
import { Position } from '@/cells/Position';
import { MapStream } from '@/streams/MapStream';
import { TypeView } from '@/views/components/TypeView';

export function TypesPanel(map: MapStream) {
  const types$ = Applied(map.message(), m => m.types());
  const newNode$ = Late<[NodeTypeCell, Position]>();
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
