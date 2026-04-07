import { Settings } from 'node:http2';
import { NodeType } from './NodeType';
import { TheSearchQuery } from './SearchQuery';
import { Node } from './Node';

export interface TheDocument {
  document: string;
  url: string;
  parent: string;
  progress: number;
  parentNames?: Record<string, string>;
  types: Record<string, NodeType>;
  objects: Record<string, NodeType>;
  position?: [number, number];
  namedSearches?: TheSearchQuery[];
  settings: Settings;
  structure?: TheDocument;
}
