import { Applied, MessageSourceType, Value } from "silentium";
import { TheMap } from "../domain/Map";
import { TheNodeType } from "../domain/NodeType";

export class MapTypeModel {
    public constructor(private map$: MessageSourceType<TheMap>, private id: string) { }

    public message() {
        return Applied(this.map$, (map) => map.objects[this.id]);
    }

    public save(data: TheNodeType) {
        const map = Value(this.map$);
        this.map$.use({
            ...map.value,
            types: {
                ...map.value.types,
                [this.id]: data,
            },
        });
        return this;
    }

    public delete() {
        const map = Value(this.map$);
        delete map.value.types[this.id];
        this.map$.use({
            ...map.value,
            types: {
                ...map.value.types,
            },
        });
        return this;
    }
}
