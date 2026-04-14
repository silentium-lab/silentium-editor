import { TheNode } from './Node';
import { TheNodeType } from './NodeType';
import { TheSearchQuery } from './SearchQuery';
import { TheSettings } from './Settings';

export interface TheMap {
  document: string;
  url: string;
  parent: string;
  progress: number;
  parentNames?: Record<string, string>;
  types: Record<string, TheNodeType>;
  objects: Record<string, TheNode>;
  position?: [number, number];
  namedSearches?: TheSearchQuery[];
  settings: TheSettings;
}
