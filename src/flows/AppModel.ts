import { MessageSourceType } from "silentium";
import { TheMap } from "../domain/Map";
import { MapModel } from "./MapModel";

export class AppModel {
    private _map: MapModel;

    public constructor() {}

    public init(map$: MessageSourceType<TheMap>) {
        this._map = new MapModel(map$);
    }

    public map() {
        return this._map;
    }
}
