import { NodeTypeTemplate } from "@/app/NodeTypeTemplate";
import { TheNode } from "@/types/Node";
import { TheNodeType } from "@/types/NodeType";

export function NodeTemplate(node: TheNode, nodeType: TheNodeType) {
  let markup = NodeTypeTemplate(nodeType);
  if (node.additionalFields) {
    Object.entries(node.additionalFields).forEach(([key, value]) => {
      markup = markup.replaceAll(`\${${key}}`, value);
    });
  }
  ['width', 'height', 'zindex'].forEach(key => {
    markup = markup.replaceAll(`\${${key}}`, (node as any)[key]);
  });
  return markup;
}
