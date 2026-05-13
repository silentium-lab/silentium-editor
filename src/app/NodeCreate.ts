import { TheNodeType } from "@/types/NodeType";
import { ThePosition } from "@/types/Position";

export function NodeCreate(type: TheNodeType, position: ThePosition) {
    return {
        additionalName: '',
        arrows: [],
        description: '',
        inMenu: false,
        lastClick: Date.now(),
        linked: false,
        menuOrder: 0,
        name: '',
        outlink: '',
        targetBlank: false,
        type: type.name,
        width: type.width,
        height: type.height,
        zindex: 0,
        id: new Date().getTime().toString(),
        createTimestamp: Date.now(),
        changeTimestamp: Date.now(),
        position,
      }
}
