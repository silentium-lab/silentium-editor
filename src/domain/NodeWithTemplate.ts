import { TheNode, TheNodeWithTemplate } from './Node';
import { TheNodeType } from './NodeType';

const notFoundTemplateMarkup =
  '<div style="background:red;padding:10px;color:white">Template Not Found! id="$id"</div>';

export function NodeWithTemplate(object: TheNode, types: TheNodeType[]): TheNodeWithTemplate {
  const type = types.find(ct => ct.name === object.type || ct.id === object.type);
  if (!type) {
    return {
      node: object,
      template: notFoundTemplateMarkup.replace('$id', object.type),
    };
  }
  let { markup } = type;
  if (!markup && 'svg' in type && typeof type.svg === 'string') {
    markup = type.svg;
  }
  if (object.additionalFields) {
    Object.entries(object.additionalFields).forEach(([key, value]) => {
      markup = markup.replaceAll(`\${${key}}`, value);
    });
  }
  ['width', 'height'].forEach(key => {
    markup = markup.replaceAll(`\${${key}}`, (object as any)[key]);
  });
  return {
    node: object,
    template: markup,
  };
}
