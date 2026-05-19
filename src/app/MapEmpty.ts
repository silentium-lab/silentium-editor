import { TheMap } from '@/types/Map';

export function MapEmpty(): TheMap {
  return {
    document: 'current',
    url: 'current',
    parent: '',
    progress: 0,
    parentNames: {},
    types: {},
    objects: {},
    position: [0, 0],
    namedSearches: [],
    settings: {
      colored: true,
      title: '',
    },
  };
}
