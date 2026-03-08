import { TheNodeType } from './NodeType';

/**
 * Compatibility with latest versions of node types
 */
export function NodeTypeCompatibility([id, type]: [string, TheNodeType]) {
  type.id = id;

  if ('svg' in type && !type.markup) {
    type.markup = type.svg as string;
  }

  return type;
}
