import { IdentifiedType } from 'silentium';
import { TheNodeType } from '../types/NodeType';
import hash from 'object-hash';

const notFoundTemplateMarkup =
  '<div style="background:red;padding:10px;color:white">Template Not Found! id="$id"</div>';

export class NodeTypeEntity implements IdentifiedType {
  public constructor(private nodeType: TheNodeType) {}

  public data() {
    return {
      ...this.nodeType,
      markup: this.template(),
    };
  }

  public identityKey(): string {
    return hash(this.nodeType);
  }

  public id() {
    return this.nodeType?.id;
  }

  public name() {
    return this.nodeType?.name;
  }

  public template() {
    try {
      let { markup } = this.nodeType;
      if (!markup && 'svg' in this.nodeType && typeof this.nodeType.svg === 'string') {
        markup = this.nodeType.svg;
      }
      if (markup === undefined) {
        return notFoundTemplateMarkup.replace('$id', this.nodeType.id);
      }
      return markup;
    } catch {
      return notFoundTemplateMarkup;
    }
  }
}
