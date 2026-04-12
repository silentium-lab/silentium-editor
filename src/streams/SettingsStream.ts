import { MapActor } from './MapStream';

export class SettingsModel {
  public constructor(private map: MapActor) { }

  public message() {
    return {};
  }
}
