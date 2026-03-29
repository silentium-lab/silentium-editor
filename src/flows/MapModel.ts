import { All, Applied, Context, MessageSourceType } from 'silentium';
import { TheMap } from '../domain/Map';
import { NodeNew } from '../domain/NodeNew';
import { TheNodeType } from '../domain/NodeType';
import { ThePosition } from '../domain/Position';
import { MapObjectModel } from './MapObjectModel';
import { MapTypeModel } from './MapTypeModel';
import { SettingsModel } from './SettingsModel';

export class MapModel {
    public constructor(private map$: MessageSourceType<TheMap>) { }

    public addType = (data: TheNodeType) => {
        const newType = new MapTypeModel(this.map$, Date.now().toString());
        newType.save(data);
        return this;
    }

    public addObject = (type: TheNodeType, position: ThePosition) => {
        const object = NodeNew(type, position);
        const newObject = new MapObjectModel(this.map$, object.id);
        newObject.save(object);
        return this;
    }

    public message() {
        return this.map$;
    }

    public type(id: string) {
        return new MapTypeModel(this.map$, id);
    }

    public object(id: string) {
        return new MapObjectModel(this.map$, id);
    }

    public settings(): SettingsModel {
        return new SettingsModel(this.map$);
    }

    public activeObject() {
        const activeId$ = Context<{ id: string }>('active-node-id');
        return Applied(All(activeId$, this.map$), ([id, map]) => {
            if (map.objects[id.id]) {
                return map.objects[id.id];
            }
        });
    }
}
