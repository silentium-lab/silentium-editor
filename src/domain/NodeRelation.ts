import { TheNodeType } from "./NodeType";

/**
 * The relation between two map nodes
 */
export interface TheNodeRelation {
  id: string;
  label: string;
  begin?: TheNodeType;
  end?: TheNodeType;
}
