import { DateEntity } from '@/entities/DateEntity';
import { Node } from './Node';
import { NodeTypeEntity } from './NodeTypeEntity';
import { Position } from './Position';

export class NodeEntity {
  public constructor(
    private node: Node,
    private nodeType: NodeTypeEntity
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
    return Object.fromEntries(
      Array.from(this.nodeType.template().matchAll(/\$\{(.+)\}/gi)).map(match => [match[1], ''])
    );
  }

  public createdAt() {
    return DateEntity.fromTimestamp(this.node.createTimestamp).readable();
  }

  public changedAt() {
    return DateEntity.fromTimestamp(this.node.changeTimestamp).readable();
  }

  public static newNode(type: NodeTypeEntity, position: Position) {
    return new NodeEntity(
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
      }, type
    );
  }
}
