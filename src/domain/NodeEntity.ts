import { Node } from './Node';
import { NodeTypeEntity } from './NodeTypeEntity';

export class NodeEntity {
  public constructor(
    private node: Node,
    private nodeType: NodeTypeEntity
  ) { }

  public data() {
    return {
      ...this.node,
      additionalFields: this.additionalFields()
    };
  }

  public type() {
    return this.nodeType;
  }

  public template() {
    let markup = this.nodeType.template();
    if (this.node.additionalFields) {
      Object.entries(this.additionalFields()).forEach(([key, value]) => {
        markup = markup.replaceAll(`\${${key}}`, value);
      });
    }
    ['width', 'height', 'zindex'].forEach(key => {
      markup = markup.replaceAll(`\${${key}}`, (this.node as any)[key]);
    });
    return markup;
  }

  public additionalFields(): Record<string, string> {
    return Object.fromEntries(
      Array.from(this.nodeType.template().matchAll(/\$\{(.+)\}/gi)).map(match => [match[1], ''])
    );
  }
}
