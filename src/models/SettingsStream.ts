import { MapStream } from './MapStream';

export class SettingsStream {
  public constructor(private map: MapStream) {}

  public message() {
    return {};
  }
}
