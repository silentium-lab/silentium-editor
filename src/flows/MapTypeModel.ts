import { Actual, All, Applied, MaybeMessage, MessageType, Value } from 'silentium';
import { TheNodeType } from '../domain/NodeType';
import { MapModel } from './MapModel';

export class MapTypeModel {
  private id: MessageType<string>;

  public constructor(
    private _map: MapModel,
    id: MaybeMessage<string>
  ) {
    this.id = Actual(id);
  }

  public message() {
    return Applied(All(this._map.message(), this.id), ([map, id]) => map.types[id]);
  }

  public map() {
    return this.map;
  }

  public save(data: TheNodeType) {
    const map = Value(this._map.message());
    if (!map.value) {
      throw new Error('MapTypeModel: map is empty! Impossible to save');
    }
    const id = Value(this.id);
    if (!id.value) {
      throw new Error('MapTypeModel: id is empty! Impossible to save');
    }
    this._map.save({
      ...map.value,
      types: {
        ...map.value.types,
        [id.value]: data,
      },
    });
    return this;
  }

  public delete() {
    const map = Value(this._map.message());
    if (!map.value) {
      throw new Error('MapTypeModel: map is empty! Impossible to save');
    }
    const id = Value(this.id);
    if (!id.value) {
      throw new Error('MapTypeModel: id is empty! Impossible to save');
    }
    delete map.value.types[id.value];
    this._map.save({
      ...map.value,
      types: {
        ...map.value.types,
      },
    });
    return this;
  }
}
