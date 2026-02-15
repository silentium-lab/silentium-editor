import { values } from 'lodash-es';
import { Applied, Computed, MessageType } from 'silentium';
import { Path } from 'silentium-components';
import { TheMap } from '../domain/Map';
import { TheNode, TheNodeWithTemplate } from '../domain/Node';
import { TheNodeType } from '../domain/NodeType';
import { NodeWithTemplate } from '../domain/NodeWithTemplate';

/**
 * Map nodes with the compiled template
 * compilation means insert values instead
 * variables placeholders
 */
export function NodesWithTemplate(map$: MessageType<TheMap>): MessageType<TheNodeWithTemplate[]> {
  const objects$ = Applied<unknown, TheNode[]>(Path<TheNode>(map$, 'objects'), values);
  const types$ = Path<Record<string, TheNodeType>>(map$, 'types');
  return Computed(
    (objects, types) => {
      types = Object.values(types);
      return objects.map(object => NodeWithTemplate(object, types));
    },
    objects$,
    types$
  );
}
