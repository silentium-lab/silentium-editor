import { Computed, Late, Map, MessageSourceType, Value } from 'silentium';
import { Part, Template } from 'silentium-components';
import { html } from 'silentium-ui';
import { TheNodeType } from '../../domain/NodeType';
import { NodeTypeCompatibility } from '../../domain/NodeTypeCompatibility';
import { TypeView } from './TypeView';
import { TheMap } from '../../domain/Map';
import { ThePosition } from '../../domain/Position';
import { NodeNew } from '../../domain/NodeNew';

export function TypesPanel(map$: MessageSourceType<TheMap>) {
  const types$ = Part<Record<string, TheNodeType>>(map$, 'types');
  const typesList$ = Computed(
    t => t.map(NodeTypeCompatibility),
    Computed(Object.values<TheNodeType>, types$)
  );
  const newNode$ = Late<[TheNodeType, ThePosition]>();
  const map = Value(map$);
  newNode$.then(([type, position]) => {
    const newNode = NodeNew(type, position);
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
      <div class="types-panel relative px-2">
        ${t.raw(Map(typesList$, t => TypeView(newNode$, t)))}
      </div>
    `
  );
}
