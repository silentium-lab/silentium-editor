import { TheNode } from '@/types/Node';

export function NodeHasUrl(node: TheNode): boolean {
  return node.linked;
}
