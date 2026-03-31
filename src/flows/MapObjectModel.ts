import { Actual, All, Applied, MaybeMessage, MessageType, Value } from 'silentium';
import { TheNode } from '../domain/Node';
import { ThePosition } from '../domain/Position';
import { MapModel } from './MapModel';

export class MapObjectModel {
  private id: MessageType<string>;

  public constructor(
    private _map: MapModel,
    id: MaybeMessage<string>
  ) {
    this.id = Actual(id);
  }

  public message() {
    return Applied(All(this._map.message(), this.id), ([map, id]) => map.objects[id]);
  }

  public map() {
    return this.map;
  }

  public save(data: TheNode) {
    const map = Value(this._map.message());
    if (!map.value) {
      throw new Error('MapObjectModel: map is empty! Impossible to save');
    }
    const id = Value(this.id);
    if (!id.value) {
      throw new Error('MapObjectModel: id is empty! Impossible to save');
    }
    this._map.save({
      ...map.value,
      objects: {
        ...map.value.objects,
        [id.value]: data,
      },
    });
    return this;
  }

  public newPosition(position: ThePosition) {
    const map = Value(this._map.message());
    if (!map.value) {
      throw new Error('MapObjectModel: map is empty! Impossible to move');
    }
    const id = Value(this.id);
    if (!id.value) {
      throw new Error('MapObjectModel: id is empty! Impossible to move');
    }
    const node = map.value.objects[id.value];
    this._map.save({
      ...map.value,
      objects: {
        ...map.value.objects,
        [id.value]: {
          ...node,
          position,
        },
      },
    });
  }

  public delete() {
    const map = Value(this._map.message());
    if (!map.value) {
      throw new Error('MapObjectModel: map is empty! Impossible to delete');
    }
    const id = Value(this.id);
    if (!id.value) {
      throw new Error('MapObjectModel: id is empty! Impossible to delete');
    }
    delete map.value.objects[id.value];
    this._map.save({
      ...map.value,
      objects: {
        ...map.value.objects,
      },
    });
    return this;
  }
}
