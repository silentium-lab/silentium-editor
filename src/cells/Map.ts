import { Node } from './Node';
import { NodeType } from './NodeType';
import { TheSearchQuery } from './SearchQuery';
import { TheSettings } from './Settings';

export interface Map {
  document: string;
  url: string;
  parent: string;
  progress: number;
  parentNames?: Record<string, string>;
  types: Record<string, NodeType>;
  objects: Record<string, Node>;
  position?: [number, number];
  namedSearches?: TheSearchQuery[];
  settings: TheSettings;
}
