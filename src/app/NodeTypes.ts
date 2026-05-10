import { TheMap } from '@/types/Map';
import { TheNodeType } from '@/types/NodeType';

export function NodeTypes(state: TheMap): TheNodeType[] {
  return Object.values(state.types);
}
