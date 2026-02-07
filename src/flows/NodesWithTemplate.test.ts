import { NodesWithTemplate } from './NodesWithTemplate';
import { Map } from '../domain/Map';
import { Node } from '../domain/Node';
import { NodeType } from '../domain/NodeType';
import { MessageType, Of } from 'silentium';

describe('NodesWithTemplate', () => {
  function createMap(objects: Record<string, Node>, types: Record<string, NodeType>): MessageType<Map> {
    return Of({
      objects,
      types,
      document: '',
      url: '',
      parent: '',
      progress: 0,
      settings: {} as any,
    });
  }

  test('should return nodes with templates when types match', () => {
    const map: MessageType<Map> = createMap(
      { '1': { id: '1', type: '1', position: [10, 20], name: '', additionalName: null, outlink: '', linked: false, description: '', zindex: 0, arrows: [], targetBlank: false, lastClick: 0, inMenu: false, menuOrder: 0, width: 10, height: 10, createTimestamp: 0, changeTimestamp: 0 } },
      { '1': { id: 1, svg: '<rect x="${x}" y="${y}" width="${width}" height="${height}" />' } }
    );

    const result = NodesWithTemplate(map);

    expect(result.unwrap()).toEqual([
      {
        obj: { id: '1', type: '1', position: [10, 20], name: '', additionalName: null, outlink: '', linked: false, description: '', zindex: 0, arrows: [], targetBlank: false, lastClick: 0, inMenu: false, menuOrder: 0, width: 10, height: 10, createTimestamp: 0, changeTimestamp: 0 },
        template: '<rect x="10" y="20" width="10" height="10" />',
      },
    ]);
  });

  test('should return empty template when type is not found', () => {
    const map: MessageType<Map> = createMap(
      { '1': { id: '1', type: '999', position: [10, 20], name: '', additionalName: null, outlink: '', linked: false, description: '', zindex: 0, arrows: [], targetBlank: false, lastClick: 0, inMenu: false, menuOrder: 0, width: 10, height: 10, createTimestamp: 0, changeTimestamp: 0 } },
      { '1': { id: 1, svg: '<rect />' } }
    );

    const result = NodesWithTemplate(map);

    expect(result.unwrap()).toEqual([
      {
        obj: { id: '1', type: '999', position: [10, 20], name: '', additionalName: null, outlink: '', linked: false, description: '', zindex: 0, arrows: [], targetBlank: false, lastClick: 0, inMenu: false, menuOrder: 0, width: 10, height: 10, createTimestamp: 0, changeTimestamp: 0 },
        template: '',
      },
    ]);
  });

  test('should replace additional fields in template', () => {
    const map: MessageType<Map> = createMap(
      {
        '1': {
          id: '1',
          type: '1',
          position: [10, 20],
          name: '',
          additionalName: null,
          outlink: '',
          linked: false,
          description: '',
          zindex: 0,
          arrows: [],
          targetBlank: false,
          lastClick: 0,
          inMenu: false,
          menuOrder: 0,
          width: 10,
          height: 10,
          additionalFields: { color: 'red', label: 'Node 1' },
          createTimestamp: 0,
          changeTimestamp: 0,
        },
      },
      {
        '1': {
          id: 1,
          svg: '<rect x="${x}" y="${y}" fill="${color}"><title>${label}</title></rect>',
        },
      }
    );

    const result = NodesWithTemplate(map);

    expect(result.unwrap()).toEqual([
      {
        obj: {
          id: '1',
          type: '1',
          position: [10, 20],
          name: '',
          additionalName: null,
          outlink: '',
          linked: false,
          description: '',
          zindex: 0,
          arrows: [],
          targetBlank: false,
          lastClick: 0,
          inMenu: false,
          menuOrder: 0,
          width: 10,
          height: 10,
          additionalFields: { color: 'red', label: 'Node 1' },
          createTimestamp: 0,
          changeTimestamp: 0,
        },
        template: '<rect x="10" y="20" fill="red"><title>Node 1</title></rect>',
      },
    ]);
  });

  test('should handle multiple nodes', () => {
    const map: MessageType<Map> = createMap(
      {
        '1': { id: '1', type: '1', position: [10, 20], name: '', additionalName: null, outlink: '', linked: false, description: '', zindex: 0, arrows: [], targetBlank: false, lastClick: 0, inMenu: false, menuOrder: 0, width: 10, height: 10, createTimestamp: 0, changeTimestamp: 0 },
        '2': { id: '2', type: '2', position: [30, 40], name: '', additionalName: null, outlink: '', linked: false, description: '', zindex: 0, arrows: [], targetBlank: false, lastClick: 0, inMenu: false, menuOrder: 0, width: 10, height: 10, createTimestamp: 0, changeTimestamp: 0 },
      },
      {
        '1': { id: 1, svg: '<rect x="${x}" y="${y}" />' },
        '2': { id: 2, svg: '<circle cx="${x}" cy="${y}" />' },
      }
    );

    const result = NodesWithTemplate(map);

    expect(result.unwrap()).toEqual([
      {
        obj: { id: '1', type: '1', position: [10, 20], name: '', additionalName: null, outlink: '', linked: false, description: '', zindex: 0, arrows: [], targetBlank: false, lastClick: 0, inMenu: false, menuOrder: 0, width: 10, height: 10, createTimestamp: 0, changeTimestamp: 0 },
        template: '<rect x="10" y="20" width="10" height="10" />',
      },
      {
        obj: { id: '2', type: '2', position: [30, 40], name: '', additionalName: null, outlink: '', linked: false, description: '', zindex: 0, arrows: [], targetBlank: false, lastClick: 0, inMenu: false, menuOrder: 0, width: 10, height: 10, createTimestamp: 0, changeTimestamp: 0 },
        template: '<circle cx="30" cy="40" width="10" height="10" />',
      },
    ]);
  });

  test('should handle empty input', () => {
    const map: MessageType<Map> = createMap({}, {});

    const result = NodesWithTemplate(map);

    expect(result.unwrap()).toEqual([]);
  });
});
