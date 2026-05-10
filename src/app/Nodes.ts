import { TheMap } from '@/types/Map';
import { TheNode } from '@/types/Node';

export function Nodes(state: TheMap): TheNode[] {
  return Object.values(state.objects);
}
