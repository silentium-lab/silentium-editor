import { Actual, All, Applied, MaybeMessage, MessageType, Primitive } from 'silentium';
import { MapBehavior } from './MapBehavior';

export class NodeTypeBehavior {
  private id: MessageType<string>;

  public constructor(
    private map: MapBehavior,
    id: MaybeMessage<string>
  ) {
    this.id = Actual(id);
  }

  public message() {
    return Applied(All(this.map.message(), this.id), ([map, id]) => map.typeById(id));
  }

  public delete() {
    const id = Primitive(this.id);
    this.map.deleteNodeType(id.primitiveWithException());
    return this;
  }
}
