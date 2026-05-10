import { TheMap } from '@/types/Map';

export function HasParent(map: TheMap): boolean {
  return map.parent !== '';
}
