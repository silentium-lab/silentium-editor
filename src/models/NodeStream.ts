import { fromJS } from 'immutable';
import { Actual, All, Applied, Filtered, MaybeMessage, MessageType, Primitive } from 'silentium';
import { TheNode } from '@/types/Node';
import { TheNodeRelation } from '@/types/NodeRelation';
import { ThePosition } from '@/types/Position';
import { MapStream } from './MapStream';
import { NodeModel } from '@/models/NodeEntity';

export class NodeStream {
  private readonly id: MessageType<string>;

  public constructor(
    private readonly map: MapStream,
    id: MaybeMessage<string>
  ) {
    this.id = Actual(id);
  }

  public message() {
    return Filtered(
      Applied(All(this.map.message(), this.id), ([map, id]) =>
        map.hasNode(id) ? map.nodeById(id) : false
      ),
      Boolean
    ) as MessageType<NodeModel>;
  }

  public newPosition(position: ThePosition) {
    const node = Primitive(this.message());
    this.map.saveNode(
      fromJS(node.primitiveWithException().data())
        .setIn(['position'], position)
        .toObject() as unknown as TheNode
    );
  }

  public toRelation(toNodeId: string) {
    const node = Primitive(Applied(this.message(), n => n.data()));
    this.map.saveNode(
      fromJS(node.primitiveWithException())
        .updateIn(['arrows'], arr =>
          (arr as TheNodeRelation[]).push({
            id: toNodeId,
            label: '',
          })
        )
        .toObject() as unknown as TheNode
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

  public update(v: TheNode) {
    this.map.saveNode(v);
    return this;
  }

  public updateAdditionalFields(additionalFields: Record<string, string>) {
    const node = Primitive(Applied(this.message(), n => n.data()));
    this.map.saveNode(
      fromJS(node.primitiveWithException())
        .setIn(['additionalFields'], additionalFields)
        .toObject() as unknown as TheNode
    );
  }
}
