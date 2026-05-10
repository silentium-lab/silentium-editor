import { TheMap } from '@/types/Map';
import { TheNode } from '@/types/Node';
import { curry, omit } from 'lodash-es';

export const DeleteNode = curry((node: TheNode, state: TheMap): TheMap => {
  return {
    ...state,
    objects: omit(state.objects, node.id),
  };
});
