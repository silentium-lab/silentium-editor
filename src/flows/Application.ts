import { MapModel } from './MapModel';

export class Application {
  private _map = new Feature('map', stream => new MapModel(stream));

  public map() {
    return this._map;
  }
}

class Feature<T> {
  private _feature?: T;

  public constructor(
    private name: string,
    private constr: (...args: any[]) => T
  ) {}

  public provide(...args: any[]) {
    this._feature = this.constr(...args);
    return this;
  }

  public get(): T {
    if (this._feature === undefined) {
      throw new Error(`Feature ${this.name} not provided!`);
    }
    return this._feature;
  }
}
