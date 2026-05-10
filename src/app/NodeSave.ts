import { TheMap } from '@/types/Map';
import { TheNode } from '@/types/Node';
import { curry } from 'lodash-es';

export const SaveNode = curry((node: TheNode, state: TheMap): TheMap => {
  return {
    ...state,
    objects: {
      ...state.objects,
      [node.id]: node,
    },
  };
});
