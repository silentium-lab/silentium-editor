import { MessageSourceType } from 'silentium';
import { Part } from 'silentium-components';
import { TheSettings } from '../domain/Settings';
import { MapModel } from './MapModel';

export class SettingsModel {
  public constructor(private map: MapModel) {
  }

  public message() {
    return {};
  }
}
