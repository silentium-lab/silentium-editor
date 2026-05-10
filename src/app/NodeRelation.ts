import { TheMap } from '@/types/Map';
import { curry } from 'lodash-es';

export const NodeRelation = curry((toNodeId: string, fromNodeId: string, state: TheMap): TheMap => {
  const fromNode = state.objects[fromNodeId];
  return {
    ...state,
    objects: {
      ...state.objects,
      [fromNodeId]: {
        ...fromNode,
        arrows: [
          ...fromNode.arrows,
          {
            id: toNodeId,
            label: '',
          },
        ],
      },
    },
  };
});
