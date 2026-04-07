import { Actual, All, Applied, MaybeMessage, MessageType, Value } from 'silentium';
import { MapModel } from './MapModel';

export class NodeTypeModel {
  private id: MessageType<string>;

  public constructor(
    private map: MapModel,
    id: MaybeMessage<string>
  ) {
    this.id = Actual(id);
  }

  public message() {
    return Applied(All(this.map.message(), this.id), ([map, id]) => map.types[id]);
  }

  public delete() {
    const id = Value(this.id);
    this.map.deleteNode(id.value);
    return this;
  }
}
