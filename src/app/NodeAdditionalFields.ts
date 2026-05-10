import { TheNode } from '@/types/Node';
import { TheNodeType } from '@/types/NodeType';
import { NodeTypeTemplate } from './NodeTypeTemplate';

export function NodeAdditionalFields(node: TheNode, nodeType: TheNodeType): Record<string, string> {
  const defaultFields = Object.fromEntries(
    Array.from(NodeTypeTemplate(nodeType).matchAll(/\$\{([a-zA-Z0-9]+)\}/gi)).map(match => [
      match[1],
      '',
    ])
  );
  return Object.fromEntries(
    Object.entries(defaultFields).map(entry => {
      return [entry[0], node.additionalFields?.[entry[0]] ?? (entry[1] || entry[0])];
    })
  );
}
