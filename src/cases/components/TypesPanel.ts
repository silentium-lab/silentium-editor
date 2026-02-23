import { Computed, Context, Late, Map, MessageSourceType, Value } from 'silentium';
import { Part, Template } from 'silentium-components';
import { html } from 'silentium-ui';
import { TheMap } from '../../domain/Map';
import { NodeNew } from '../../domain/NodeNew';
import { TheNodeType } from '../../domain/NodeType';
import { NodeTypeCompatibility } from '../../domain/NodeTypeCompatibility';
import { ThePoint } from '../../domain/Point';
import { ThePosition } from '../../domain/Position';
import { TypeView } from './TypeView';

export function TypesPanel(map$: MessageSourceType<TheMap>) {
  const types$ = Part<Record<string, TheNodeType>>(map$, 'types');
  const typesList$ = Computed(
    t => t.map(NodeTypeCompatibility),
    Computed(Object.values<TheNodeType>, types$)
  );
  const newNode$ = Late<[TheNodeType, ThePosition]>();
  const map = Value(map$);
  const canvasPosition$ = Value(Context<ThePoint>('canvas-position'));
  newNode$.then(([type, position]) => {
    const newNode = NodeNew(type, [
      position[0] + canvasPosition$.value.x - 200,
      position[1] + canvasPosition$.value.y + 40,
    ]);
    map$.use({
      ...map.value,
      objects: {
        ...map.value.objects,
        [newNode.id]: newNode,
      },
    });
  });
  return Template(
    t => html`
      <div class="types-panel relative px-2 z-10">
        ${t.raw(Map(typesList$, t => TypeView(newNode$, t)))}
      </div>
    `
  );
}
