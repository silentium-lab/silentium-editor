import { TheNodeType } from '@/types/NodeType';

export function NodeTypesList(types: TheNodeType[]): { id: string; label: string }[] {
  return types.map(t => ({
    id: t.id,
    label: t.name,
  }));
}
