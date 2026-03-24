import { MessageSourceType } from 'silentium';
import { Part } from 'silentium-components';
import { TheMap } from '../domain/Map';
import { TheSettings } from '../domain/Settings';

export class SettingsModel {
    private settings: MessageSourceType<TheSettings>;

    public constructor(private map$: MessageSourceType<TheMap>) {
        this.settings = Part(this.map$, 'settings');
    }

    public message() {
        return this.settings;
    }

    public save = (data: TheSettings) => {
        this.settings.use({ ...data });
        return this;
    }
}
