import { TheMap } from '@/types/Map';
import { TheNode } from '@/types/Node';
import { curry } from 'lodash-es';

export const NodeAdditionalFieldsSave = curry(
  (node: TheNode, additionalFields: Record<string, string>, state: TheMap): TheMap => {
    return {
      ...state,
      objects: {
        ...state.objects,
        [node.id]: {
          ...node,
          additionalFields,
        },
      },
    };
  }
);
