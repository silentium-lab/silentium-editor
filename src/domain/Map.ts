import { Node } from "./Node";
import { NodeType } from "./NodeType";
import { SearchQuery } from "./SearchQuery";
import { Settings } from "./Settings";

export interface Map {
  document: string;
  url: string;
  parent: string;
  progress: number;
  parentNames?: Record<string, string>;
  types: Record<string, NodeType>;
  objects: Record<string, Node>;
  position?: [number, number];
  namedSearches?: SearchQuery[];
  settings: Settings;
}

// Map object for tests
export function FakeMap(): Map {
  return {
    document: "Example",
    progress: 0,
    settings: {
      colored: false,
      title: "The map example"
    },
    objects: {
      "1761807613611": {
        additionalName: "",
        arrows: [],
        description: "",
        inMenu: false,
        lastClick: 1761807613611,
        linked: false,
        menuOrder: 0,
        name: "",
        outlink: "/current",
        targetBlank: false,
        type: "Value",
        width: 190,
        height: 261,
        zindex: 0,
        id: "1761807613611",
        createTimestamp: 1761807613611,
        changeTimestamp: 1761807676337,
        position: [75, 60],
        additionalFields: {
          text: "The description"
        }
      }
    },
    types: {
      "Value": {
        id: "Value",
        name: "Value",
        markup: "<div class='node'>${text}</div>",
        width: 190,
        height: 40
      }
    },
    url: "/current",
    parent: ""
  };
}
