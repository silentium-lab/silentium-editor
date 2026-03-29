import { All, Applied, Context, MessageSourceType, Value } from "silentium";
import { TheMap } from "../domain/Map";
import { TheNode } from "../domain/Node";
import { ThePosition } from "../domain/Position";

export class MapObjectModel {
    public constructor(private map$: MessageSourceType<TheMap>, private id: string) { }

    public message() {
        return Applied(this.map$, (map) => map.types[this.id]);
    }

    public save(data: TheNode) {
        const map = Value(this.map$);
        this.map$.use({
            ...map.value,
            objects: {
                ...map.value.objects,
                [this.id]: data,
            },
        });
        return this;
    }

    public newPosition(position: ThePosition) {
        const map = Value(this.map$);
        const node = map.value.objects[this.id];
        this.map$.use({
            ...map.value,
            objects: {
                ...map.value.objects,
                [this.id]: {
                    ...node,
                    position,
                },
            },
        });
    }

    public delete() {
        const map = Value(this.map$);
        delete map.value.objects[this.id];
        this.map$.use({
            ...map.value,
            objects: {
                ...map.value.objects,
            },
        });
        return this;
    }
}
