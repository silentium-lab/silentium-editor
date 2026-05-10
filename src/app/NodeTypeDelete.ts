import { TheMap } from '@/types/Map';
import { TheNodeType } from '@/types/NodeType';
import { curry, omit } from 'lodash-es';

export const DeleteNodeType = curry((nodeType: TheNodeType, state: TheMap): TheMap => {
  return {
    ...state,
    types: omit(state.types, nodeType.id),
  };
});
