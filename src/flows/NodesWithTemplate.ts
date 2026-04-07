import { values } from 'lodash-es';
import { Applied, Computed, MessageType } from 'silentium';
import { Path } from 'silentium-components';
import { Map } from '../domain/Map';
import { Node, NodeWithTemplate } from '../domain/Node';
import { NodeType } from '../domain/NodeType';
import { NodeWithTemplate } from '../domain/NodeWithTemplate';

/**
 * Map nodes with the compiled template
 * compilation means insert values instead
 * variables placeholders
 */
export function NodesWithTemplate(map$: MessageType<Map>): MessageType<NodeWithTemplate[]> {
  const objects$ = Applied<unknown, Node[]>(Path<Node>(map$, 'objects'), values);
  const types$ = Path<Record<string, Node>>(map$, 'types');
  return Computed(
    (objects, types) => {
      types = Object.values(types);
      return objects.map(object => NodeWithTemplate(object, types));
    },
    objects$,
    types$
  );
}
