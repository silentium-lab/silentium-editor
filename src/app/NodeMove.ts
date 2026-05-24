import { NodeSave } from "@/app/NodeSave";
import { TheNode } from "@/types/Node";
import { ThePosition } from "@/types/Position";
import { curry } from "lodash-es";

export const NodeMove = curry((node: TheNode, position: ThePosition, state: TheMap) => {
  return NodeSave({
    ...node,
    position
  }, state);
});
