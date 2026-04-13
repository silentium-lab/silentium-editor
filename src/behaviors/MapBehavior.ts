import { fromJS } from 'immutable';
import {
  Applied,
  Context,
  ContextChain,
  ContextOf,
  Late,
  MessageSourceType,
  Primitive,
  PrimitiveImpl,
} from 'silentium';
import { HashTable, Path } from 'silentium-components';
import { Map } from '@/types/Map';
import { Node } from '@/types/Node';
import { NodeType } from '@/types/NodeType';
import { Position } from '@/types/Position';
import { NodeBehavior } from './NodeBehavior';
import { NodeTypeBehavior } from './NodeTypeBehavior';
import { SettingsBehavior } from './SettingsBehavior';
import { MapModel } from '@/models/MapModel';
import { NodeTypeModel } from '@/models/NodeTypeModel';
import { NodeModel } from '@/models/NodeModel';

export class MapBehavior {
  private readonly nodeEditBlockReasons$ = Late<[string, boolean]>();
  private readonly nodeBlockRecord$ = HashTable<Record<string, boolean>>(
    this.nodeEditBlockReasons$
  );
  private readonly map: PrimitiveImpl<Map>;
  private readonly TYPES_KEY = 'types';
  private readonly NODES_KEY = 'objects';

  public constructor(private map$: MessageSourceType<Map>) {
    this.objectEditBlockInit();
    this.map = Primitive(map$);
  }

  public message() {
    return Applied(this.map$, map => new MapModel(map));
  }

  public size() {
    return Applied(this.message(), m => m.size());
  }

  public url() {
    return Applied(this.message(), m => m.data().url);
  }

  public nodeTypes() {
    return Applied(this.message(), map => map.types());
  }

  public nodeType(id: string) {
    return new NodeTypeBehavior(this, id);
  }

  public saveNodeType(data: NodeType) {
    const state = fromJS(this.map.primitiveWithException());
    this.map$.use(state.setIn([this.TYPES_KEY, data.id], data).toObject() as unknown as Map);
    return this;
  }

  public deleteNodeType(id: string) {
    const state = fromJS(this.map.primitiveWithException());
    this.map$.use(state.deleteIn([this.TYPES_KEY, id]).toObject() as unknown as Map);
    return this;
  }

  public nodes() {
    return Applied(this.message(), m => m.nodes());
  }

  public activeNode() {
    const activeId$ = Context<{ id: string }>('active-node-id');
    return new NodeBehavior(this, Path(activeId$, 'id'));
  }

  public node(id: string) {
    return new NodeBehavior(this, id);
  }

  public saveNode(data: Node) {
    const state = fromJS(this.map.primitiveWithException());
    this.map$.use(state.setIn([this.NODES_KEY, data.id], data).toObject() as unknown as Map);
    return this;
  }

  public deleteNode(id: string) {
    const state = fromJS(this.map.primitiveWithException());
    this.map$.use(state.deleteIn([this.NODES_KEY, id]).toObject() as unknown as Map);
    return this;
  }

  public addNode(type: NodeTypeModel, position: Position) {
    this.saveNode(NodeModel.newNode(type, position).data());
    return this;
  }

  public settings(): SettingsBehavior {
    return new SettingsBehavior(this);
  }

  private objectEditBlockInit() {
    ContextOf('node-edit-block-reasons').then(ContextChain(this.nodeEditBlockReasons$));
  }

  public isNodeEditBlocked() {
    return Applied(this.nodeBlockRecord$, record => Object.values(record).some(v => v === true));
  }
}
