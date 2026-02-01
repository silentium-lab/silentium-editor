import { NodeType } from "./NodeType";

/**
 * The relation between two map nodes
 */
export interface NodeRelation {
  id: string;
  label: string;
  begin?: NodeType;
  end?: NodeType;
}
