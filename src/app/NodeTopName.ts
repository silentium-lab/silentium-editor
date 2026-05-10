import { TheNode } from '@/types/Node';

export function NodeTopName(node: TheNode): string {
  return node.additionalName ?? '';
}
