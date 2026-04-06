import { Applied, Context, ContextChain, ContextOf, Late, MessageSourceType } from 'silentium';
import { HashTable, Path } from 'silentium-components';
import { TheMap } from '../domain/Map';
import { NodeNew } from '../domain/NodeNew';
import { TheNodeType } from '../domain/NodeType';
import { ThePosition } from '../domain/Position';
import { MapObjectModel } from './MapObjectModel';
import { MapTypeModel } from './MapTypeModel';
import { SettingsModel } from './SettingsModel';

export class MapModel {
  private nodeEditBlockReasons$ = Late<[string, boolean]>();

  public constructor(private map$: MessageSourceType<TheMap>) {
    this.objectEditBlockInit();
  }

  public addType = (data: TheNodeType) => {
    const newType = new MapTypeModel(this, Date.now().toString());
    newType.save(data);
    return this;
  };

  public addObject = (type: TheNodeType, position: ThePosition) => {
    const object = NodeNew(type, position);
    const newObject = new MapObjectModel(this, object.id);
    newObject.save(object);
    return this;
  };

  public message() {
    return this.map$;
  }

  public types() {
    return Applied(this.map$, map => Object.values(map.types));
  }

  public type(id: string) {
    return new MapTypeModel(this, id);
  }

  public object(id: string) {
    return new MapObjectModel(this, id);
  }

  public settings(): SettingsModel {
    return new SettingsModel(this);
  }

  public activeObject() {
    const activeId$ = Context<{ id: string }>('active-node-id');
    return new MapObjectModel(this, Path(activeId$, 'id'));
  }

  public save(newMap: TheMap) {
    this.map$.use(newMap);
    return this;
  }

  private objectEditBlockInit() {
    ContextOf('node-edit-block-reasons').then(ContextChain(this.nodeEditBlockReasons$));
  }

  public isNodeEditBlocked() {
    const nodeBlockRecord$ = HashTable(this.nodeEditBlockReasons$);
    return Applied(nodeBlockRecord$, record =>
      Object.values(record).some(v => v === true)
    );
  }
}
