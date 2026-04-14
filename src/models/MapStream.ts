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
import { TheMap } from '@/types/Map';
import { TheNode } from '@/types/Node';
import { TheNodeType } from '@/types/NodeType';
import { ThePosition } from '@/types/Position';
import { NodeStream } from './NodeStream';
import { NodeTypeStream } from './NodeTypeStream';
import { SettingsStream } from './SettingsStream';
import { MapEntity } from '@/models/MapEntity';
import { NodeTypeEntity } from '@/models/NodeTypeEntity';
import { NodeModel } from '@/models/NodeEntity';

export class MapStream {
  private readonly nodeEditBlockReasons$ = Late<[string, boolean]>();
  private readonly nodeBlockRecord$ = HashTable<Record<string, boolean>>(
    this.nodeEditBlockReasons$
  );
  private readonly map: PrimitiveImpl<TheMap>;
  private readonly TYPES_KEY = 'types';
  private readonly NODES_KEY = 'objects';

  public constructor(private map$: MessageSourceType<TheMap>) {
    this.objectEditBlockInit();
    this.map = Primitive(map$);
  }

  public message() {
    return Applied(this.map$, map => new MapEntity(map));
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
    return new NodeTypeStream(this, id);
  }

  public saveNodeType(data: TheNodeType) {
    const state = fromJS(this.map.primitiveWithException());
    this.map$.use(state.setIn([this.TYPES_KEY, data.id], data).toObject() as unknown as TheMap);
    return this;
  }

  public deleteNodeType(id: string) {
    const state = fromJS(this.map.primitiveWithException());
    this.map$.use(state.deleteIn([this.TYPES_KEY, id]).toObject() as unknown as TheMap);
    return this;
  }

  public nodes() {
    return Applied(this.message(), m => m.nodes());
  }

  public activeNode() {
    const activeId$ = Context<{ id: string }>('active-node-id');
    return new NodeStream(this, Path(activeId$, 'id'));
  }

  public node(id: string) {
    return new NodeStream(this, id);
  }

  public saveNode(data: TheNode) {
    const state = fromJS(this.map.primitiveWithException());
    this.map$.use(state.setIn([this.NODES_KEY, data.id], data).toObject() as unknown as TheMap);
    return this;
  }

  public deleteNode(id: string) {
    const state = fromJS(this.map.primitiveWithException());
    this.map$.use(state.deleteIn([this.NODES_KEY, id]).toObject() as unknown as TheMap);
    return this;
  }

  public addNode(type: NodeTypeEntity, position: ThePosition) {
    this.saveNode(NodeModel.newNode(type, position).data());
    return this;
  }

  public settings(): SettingsStream {
    return new SettingsStream(this);
  }

  private objectEditBlockInit() {
    ContextOf('node-edit-block-reasons').then(ContextChain(this.nodeEditBlockReasons$));
  }

  public isNodeEditBlocked() {
    return Applied(this.nodeBlockRecord$, record => Object.values(record).some(v => v === true));
  }
}
