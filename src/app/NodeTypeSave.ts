import { TheMap } from '@/types/Map';
import { TheNodeType } from '@/types/NodeType';
import { curry } from 'lodash-es';

export const SaveNodeType = curry((nodeType: TheNodeType, state: TheMap): TheMap => {
  return {
    ...state,
    types: {
      ...state.types,
      [nodeType.id]: nodeType,
    },
  };
});
