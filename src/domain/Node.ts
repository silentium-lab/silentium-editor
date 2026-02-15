import { TheNodeRelation } from './NodeRelation';

/**
 * The node in the map
 */
export interface TheNode {
  id: string;
  type: string;
  position: [number, number];
  name: string;
  additionalName: string | null;
  outlink: string;
  linked: boolean;
  description: string;
  zindex: number;
  arrows: TheNodeRelation[];
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

export interface TheNodeWithTemplate {
  node: TheNode;
  template: string;
}
