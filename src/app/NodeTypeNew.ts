import { TheNodeType } from '@/types/NodeType';

export function NodeTypeNew(): TheNodeType {
  return {
    id: Date.now().toString(),
    name: '',
    markup: '<div></div>',
    width: 190,
    height: 40,
  };
}
