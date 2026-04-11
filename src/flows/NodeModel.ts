import { fromJS } from 'immutable';
import { Actual, All, Applied, MaybeMessage, MessageType, Primitive } from 'silentium';
import { Node } from '../domain/Node';
import { NodeRelation } from '../domain/NodeRelation';
import { Position } from '../domain/Position';
import { MapModel } from './MapModel';

export class NodeModel {
  private readonly id: MessageType<string>;

  public constructor(
    private readonly map: MapModel,
    id: MaybeMessage<string>
  ) {
    this.id = Actual(id);
  }

  public message() {
    return Applied(All(this.map.message(), this.id), ([map, id]) => map.nodeById(id));
  }

  public newPosition(position: Position) {
    const node = Primitive(this.message());
    this.map.saveNode(
      fromJS(node.primitiveWithException())
        .setIn(['position'], position)
        .toObject() as unknown as Node
    );
  }

  public toRelation(toNodeId: string) {
    const node = Primitive(Applied(this.message(), (n) => n.data()));
    this.map.saveNode(
      fromJS(node.primitiveWithException())
        .updateIn(['arrows'], (arr) =>
          (arr as NodeRelation[]).push({
            id: toNodeId,
            label: '',
          })
        )
        .toObject() as unknown as Node
    );
  }

  public fromRelation(fromNodeId: string) {
    const node = this.map.node(fromNodeId);
    node.toRelation(Primitive(this.id).primitiveWithException());
    return this;
  }

  public delete() {
    const id = Primitive(this.id);
    this.map.deleteNode(id.primitiveWithException());
    return this;
  }

  public update(v: Node) {
    this.map.saveNode(v);
    return this;
  }
}
