import { Settings } from "node:http2";
import { TheNodeType } from "./NodeType";
import { TheSearchQuery } from "./SearchQuery";
import { TheNode } from "./Node";

export interface TheDocument {
  document: string;
  url: string;
  parent: string;
  progress: number;
  parentNames?: Record<string, string>;
  types: Record<string, TheNodeType>;
  objects: Record<string, TheNode>;
  position?: [number, number];
  namedSearches?: TheSearchQuery[];
  settings: Settings;
  structure?: TheDocument;
}
