import { NodeRelation } from "./NodeRelation";

/**
 * The node in the map
 */
export interface Node {
  id: string;
  type: string;
  position: [number, number];
  name: string;
  additionalName: string | null;
  outlink: string;
  linked: boolean;
  description: string;
  zindex: number;
  arrows: NodeRelation[];
  targetBlank: boolean;
  lastClick: number;
  inMenu: boolean;
  menuOrder: number;
  width: number;
  height: number;
  additionalFields?: Record<string, string>;
  createTimestamp: number;
  changeTimestamp: number;
}
