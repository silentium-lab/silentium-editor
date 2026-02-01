import { Settings } from "node:http2";
import { NodeType } from "./NodeType";
import { SearchQuery } from "./SearchQuery";

export interface Document {
  document: string;
  url: string;
  parent: string;
  progress: number;
  parentNames?: Record<string, string>;
  types: Record<string, NodeType>;
  objects: Record<string, Node>;
  position?: [number, number];
  namedSearches?: SearchQuery[];
  settings: Settings;
  structure?: Document;
}
