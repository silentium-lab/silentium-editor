import { Actual, All, Applied, MaybeMessage, MessageType, Value } from 'silentium';
import { Position } from '../domain/Position';
import { MapModel } from './MapModel';
import { fromJS } from 'immutable';
import { Node } from '../domain/Node';

export class NodeModel {
  private readonly id: MessageType<string>;

  public constructor(
    private readonly map: MapModel,
    id: MaybeMessage<string>
  ) {
    this.id = Actual(id);
  }

  public message() {
    return Applied(All(this.map.message(), this.id), ([map, id]) => map.objects[id]);
  }

  public newPosition(position: Position) {
    const node = Value(this.message());
    this.map.saveNode(fromJS(node.value).setIn(['position'], position) as unknown as Node)
  }

  public delete() {
    const id = Value(this.id);
    this.map.deleteNode(id.value);
    return this;
  }
}
