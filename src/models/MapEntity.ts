import { TheMap } from '../types/Map';
import { NodeEntity } from './NodeEntity';
import { NodeTypeEntity } from './NodeTypeEntity';

export class MapEntity {
  public constructor(private map: TheMap) {}

  public data() {
    return this.map;
  }

  public nodes() {
    return Object.values(this.map.objects).map(
      node => new NodeEntity(node, this.typeById(node.type))
    );
  }

  public hasParent() {
    return !!this.map.parent;
  }

  public types() {
    return Object.values(this.map.types).map(type => new NodeTypeEntity(type));
  }

  public nodeById(id: string) {
    const node = this.map.objects[id] ?? Object.values(this.map.objects).find(t => t.id === id);
    return new NodeEntity(node, this.typeById(node.type));
  }

  public hasNode(id: string) {
    return !!this.map.objects[id];
  }

  public typeById(id: string) {
    const type =
      this.map.types[id] ?? Object.values(this.map.types).find(t => t.id === id || t.name === id);
    return new NodeTypeEntity(type);
  }

  public size() {
    return {
      height: 3000,
      width: 3000,
    };
  }

  public parent() {
    return this.map.parent.replace(/^\//, '');
  }

  public static emptyMap(url: string, parentMap: TheMap) {
    return new MapEntity({
      document: url,
      url,
      parent: parentMap.url,
      progress: 0,
      parentNames: {},
      types: {},
      objects: {},
      position: [0, 0],
      namedSearches: [],
      settings: {
        colored: true,
        title: '',
      },
    });
  }
}
