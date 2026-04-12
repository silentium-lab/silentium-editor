import { Map } from './Map';
import { NodeEntity } from './NodeEntity';
import { NodeTypeEntity } from './NodeTypeEntity';

export class MapEntity {
  public constructor(private map: Map) { }

  public data() {
    return this.map;
  }

  public nodes() {
    return Object.values(this.map.objects).map(
      node => new NodeEntity(node, this.typeById(node.type))
    );
  }

  public types() {
    return Object.values(this.map.types).map(type => new NodeTypeEntity(type));
  }

  public nodeById(id: string) {
    const node =
      this.map.objects[id] ?? Object.values(this.map.objects).find(t => t.id === id);
    return new NodeEntity(node, this.typeById(node.type));
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
}
