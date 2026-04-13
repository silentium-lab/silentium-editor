import { Actual, All, Applied, MaybeMessage, MessageType, Primitive } from 'silentium';
import { MapStream } from './MapStream';

export class NodeTypeActor {
  private id: MessageType<string>;

  public constructor(
    private map: MapStream,
    id: MaybeMessage<string>
  ) {
    this.id = Actual(id);
  }

  public message() {
    return Applied(All(this.map.message(), this.id), ([map, id]) => map.typeById(id));
  }

  public delete() {
    const id = Primitive(this.id);
    this.map.deleteNode(id.primitiveWithException());
    return this;
  }
}
