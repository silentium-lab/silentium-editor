import { TheMap } from '@/types/Map';
import { TheNode } from '@/types/Node';
import { TheNodeType } from '@/types/NodeType';

export function NodeTypeForNode(node: TheNode, map: TheMap): TheNodeType {
  let type = map.types[node.type];
  if (type === undefined) {
    const maybeType = Object.values(map.types).find(
      type => type.name === node.type || type.id === node.type
    );
    if (maybeType !== undefined) {
      type = maybeType;
    }
  }
  return type;
}
