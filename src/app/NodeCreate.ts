import { TheMap } from '@/types/Map';
import { TheNodeType } from '@/types/NodeType';
import { ThePosition } from '@/types/Position';
import { curry } from 'lodash-es';

export const NodeCreate = curry(
  (type: TheNodeType, position: ThePosition, state: TheMap): TheMap => {
    const newObject = {
      additionalName: '',
      arrows: [],
      description: '',
      inMenu: false,
      lastClick: Date.now(),
      linked: false,
      menuOrder: 0,
      name: '',
      outlink: '',
      targetBlank: false,
      type: type.name,
      width: type.width,
      height: type.height,
      zindex: 0,
      id: new Date().getTime().toString(),
      createTimestamp: Date.now(),
      changeTimestamp: Date.now(),
      position,
    };
    return {
      ...state,
      objects: {
        ...state.objects,
        [newObject.id]: newObject,
      },
    };
  }
);
