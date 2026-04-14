import { Settings } from 'node:http2';
import { TheNodeType } from './NodeType';
import { TheSearchQuery } from './SearchQuery';

export interface TheDocument {
  document: string;
  url: string;
  parent: string;
  progress: number;
  parentNames?: Record<string, string>;
  types: Record<string, TheNodeType>;
  objects: Record<string, TheNodeType>;
  position?: [number, number];
  namedSearches?: TheSearchQuery[];
  settings: Settings;
  structure?: TheDocument;
}
