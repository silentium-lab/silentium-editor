import { Map } from './Map';
import { NodeCell } from './NodeCell';
import { NodeTypeCell } from './NodeTypeCell';

export class MapCell {
  public constructor(private map: Map) { }

  public data() {
    return this.map;
  }

  public nodes() {
    return Object.values(this.map.objects).map(
      node => new NodeCell(node, this.typeById(node.type))
    );
  }

  public types() {
    return Object.values(this.map.types).map(type => new NodeTypeCell(type));
  }

  public nodeById(id: string) {
    const node = this.map.objects[id] ?? Object.values(this.map.objects).find(t => t.id === id);
    if (node === undefined) {
      console.log(id);
    }
    return new NodeCell(node, this.typeById(node.type));
  }

  public hasNode(id: string) {
    return !!this.map.objects[id];
  }

  public typeById(id: string) {
    const type =
      this.map.types[id] ?? Object.values(this.map.types).find(t => t.id === id || t.name === id);
    return new NodeTypeCell(type);
  }

  public size() {
    return {
      height: 3000,
      width: 3000,
    };
  }
}
