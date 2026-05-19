import { TheMap } from '@/types/Map';

export function MapHasParent(map: TheMap): boolean {
  return map.parent !== '';
}
