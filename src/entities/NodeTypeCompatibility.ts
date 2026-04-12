import { NodeType } from './NodeType';

/**
 * Compatibility with latest versions of node types
 */
export function NodeTypeCompatibility([id, type]: [string, NodeType]) {
  type.id = id;

  if ('svg' in type && !type.markup) {
    type.markup = type.svg as string;
  }

  return type;
}
