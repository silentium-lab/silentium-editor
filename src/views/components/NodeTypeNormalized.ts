import { TheNodeType } from '@/types/NodeType';

export function NodeTypeNormalized(nodeType: TheNodeType): TheNodeType {
  if (!nodeType.id) {
    nodeType.id = nodeType.name;
  }
  if (!nodeType.markup && 'svg' in nodeType) {
    nodeType.markup = nodeType.svg as string;
  }
  return nodeType;
}
