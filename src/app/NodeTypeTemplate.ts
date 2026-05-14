import { TheNodeType } from '@/types/NodeType';

const notFoundTemplateMarkup =
  '<div style="background:red;padding:10px;color:white">Template Not Found! id="$id"</div>';

export function NodeTypeTemplate(nodeType: TheNodeType) {
  try {
    let { markup } = nodeType;
    if (!markup && 'svg' in nodeType && typeof nodeType.svg === 'string') {
      markup = nodeType.svg;
    }
    if (markup === undefined) {
      return notFoundTemplateMarkup.replace('$id', nodeType.id);
    }
    return markup;
  } catch {
    return notFoundTemplateMarkup;
  }
}
