import { DateCell } from '@/cells/DateCell';
import { Node } from './Node';
import { NodeTypeCell } from './NodeTypeCell';
import { Position } from './Position';

export class NodeCell {
  public constructor(
    private node: Node,
    private nodeType: NodeTypeCell
  ) { }

  public id() {
    return this.node.id;
  }

  public data() {
    return this.node;
  }

  public type() {
    return this.nodeType;
  }

  public template() {
    let markup = this.nodeType.template();
    if (this.node.additionalFields) {
      Object.entries(this.node.additionalFields).forEach(([key, value]) => {
        markup = markup.replaceAll(`\${${key}}`, value);
      });
    }
    ['width', 'height', 'zindex'].forEach(key => {
      markup = markup.replaceAll(`\${${key}}`, (this.node as any)[key]);
    });
    return markup;
  }

  public additionalFields(): Record<string, string> {
    const defaultFields = Object.fromEntries(
      Array.from(this.nodeType.template().matchAll(/\$\{([a-zA-Z0-9]+)\}/gi)).map(match => [match[1], ''])
    );
    return Object.fromEntries(Object.entries(defaultFields).map((entry) => {
      return [entry[0], this.node.additionalFields?.[entry[0]] ?? (entry[1] || entry[0])];
    }));
  }

  public createdAt() {
    return DateCell.fromTimestamp(this.node.createTimestamp).readable();
  }

  public changedAt() {
    return DateCell.fromTimestamp(this.node.changeTimestamp).readable();
  }

  public static newNode(type: NodeTypeCell, position: Position) {
    return new NodeCell(
      {
        additionalName: '',
        arrows: [],
        description: '',
        inMenu: false,
        lastClick: Date.now(),
        linked: false,
        menuOrder: 0,
        name: '',
        outlink: '',
        targetBlank: false,
        type: type.data().name,
        width: type.data().width,
        height: type.data().height,
        zindex: 0,
        id: new Date().getTime().toString(),
        createTimestamp: Date.now(),
        changeTimestamp: Date.now(),
        position,
      },
      type
    );
  }
}
