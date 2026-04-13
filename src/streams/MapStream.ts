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
import { Map } from '@/cells/Map';
import { Node } from '@/cells/Node';
import { NodeType } from '@/cells/NodeType';
import { Position } from '@/cells/Position';
import { NodeActor } from './NodeStream';
import { NodeTypeActor } from './NodeTypeStream';
import { SettingsModel } from './SettingsStream';
import { MapCell } from '@/cells/MapCell';
import { NodeTypeCell } from '@/cells/NodeTypeCell';
import { NodeCell } from '@/cells/NodeCell';

export class MapStream {
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
    return Applied(this.map$, map => new MapCell(map));
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
    return new NodeTypeActor(this, id);
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
    return new NodeActor(this, Path(activeId$, 'id'));
  }

  public node(id: string) {
    return new NodeActor(this, id);
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

  public addNode(type: NodeTypeCell, position: Position) {
    this.saveNode(NodeCell.newNode(type, position).data());
    return this;
  }

  public settings(): SettingsModel {
    return new SettingsModel(this);
  }

  private objectEditBlockInit() {
    ContextOf('node-edit-block-reasons').then(ContextChain(this.nodeEditBlockReasons$));
  }

  public isNodeEditBlocked() {
    return Applied(this.nodeBlockRecord$, record => Object.values(record).some(v => v === true));
  }
}
