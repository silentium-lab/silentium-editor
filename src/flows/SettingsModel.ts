import { MessageSourceType } from 'silentium';
import { Part } from 'silentium-components';
import { TheSettings } from '../domain/Settings';
import { MapModel } from './MapModel';

export class SettingsModel {
  private settings: MessageSourceType<TheSettings>;

  public constructor(private map: MapModel) {
    this.settings = Part(this.map.message(), 'settings');
  }

  public message() {
    return this.settings;
  }

  public save = (data: TheSettings) => {
    this.settings.use({ ...data });
    return this;
  };
}
