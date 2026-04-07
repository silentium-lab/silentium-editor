import { Applied, Context, ContextChain, ContextOf, Late, MessageSourceType, PassiveType } from 'silentium';
import { HashTable, Path } from 'silentium-components';
import { Map } from '../domain/Map';
import { NodeNew } from '../domain/NodeNew';
import { NodeType } from '../domain/NodeType';
import { Position } from '../domain/Position';
import { NodeModel } from './NodeModel';
import { NodeTypeModel } from './NodeTypeModel';
import { SettingsModel } from './SettingsModel';
import { fromJS } from 'immutable';
import { Node } from '../domain/Node';

export class MapModel {
  private readonly nodeEditBlockReasons$ = Late<[string, boolean]>();
  private readonly nodeBlockRecord$ = HashTable(this.nodeEditBlockReasons$);
  private readonly map: PassiveType<Map>;
  private readonly TYPES_KEY = 'types';
  private readonly NODES_KEY = 'objects';

  public constructor(private map$: MessageSourceType<Map>) {
    this.objectEditBlockInit();
  }

  public message() {
    return this.map$;
  }

  public nodeTypes() {
    return Applied(this.map$, map => Object.values(map.types));
  }

  public nodeType(id: string) {
    return new NodeTypeModel(this, id);
  }

  public saveNodeType(data: NodeType) {
    const state = fromJS(this.map.value);
    this.map$.use(state.setIn([this.TYPES_KEY, data.id], data) as unknown as Map);
    return this;
  };

  public deleteNodeType(id: string) {
    const state = fromJS(this.map.value);
    this.map$.use(state.deleteIn([this.TYPES_KEY, id]) as unknown as Map);
    return this;
  }

  public activeNode() {
    const activeId$ = Context<{ id: string }>('active-node-id');
    return new NodeModel(this, Path(activeId$, 'id'));
  }

  public node(id: string) {
    return new NodeModel(this, id);
  }

  public saveNode(data: Node) {
    const state = fromJS(this.map.value);
    this.map$.use(state.setIn([this.NODES_KEY, data.id], data) as unknown as Map);
    return this;
  }

  public deleteNode(id: string) {
    const state = fromJS(this.map.value);
    this.map$.use(state.deleteIn([this.NODES_KEY, id]) as unknown as Map);
    return this;
  }

  public addNode(type: NodeType, position: Position) {
    this.saveNode(NodeNew(type, position));
    return this;
  }

  public settings(): SettingsModel {
    return new SettingsModel(this);
  }

  private objectEditBlockInit() {
    ContextOf('node-edit-block-reasons').then(ContextChain(this.nodeEditBlockReasons$));
  }

  public isNodeEditBlocked() {
    return Applied(this.nodeBlockRecord$, record =>
      Object.values(record).some(v => v === true)
    );
  }
}
