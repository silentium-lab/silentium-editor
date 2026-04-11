import { NodeType } from './NodeType';

const notFoundTemplateMarkup =
  '<div style="background:red;padding:10px;color:white">Template Not Found! id="$id"</div>';

export class NodeTypeEntity {
  public constructor(private nodeType: NodeType) {}

  public template() {
    let { markup } = this.nodeType;
    if (!markup && 'svg' in this.nodeType && typeof this.nodeType.svg === 'string') {
      markup = this.nodeType.svg;
    }
    if (markup === undefined) {
      return notFoundTemplateMarkup.replace('$id', this.nodeType.id);
    }
    return markup;
  }
}
