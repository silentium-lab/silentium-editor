import { describe, expect, test } from 'vitest';
import { NodeTypeModel } from './NodeTypeModel';

describe('NodeTypeEntity.test', () => {
  test('template in markup or svg', () => {
    const t = new NodeTypeModel(<any>{
      markup: 'template',
      svg: 'svg',
    });
    expect(t.template()).toBe('template');
  });

  test('use svg field if no template', () => {
    const t = new NodeTypeModel(<any>{
      svg: 'svg',
    });
    expect(t.template()).toBe('svg');
  });

  test('no template - error', () => {
    const t = new NodeTypeModel(<any>{
      id: 123,
    });
    expect(t.template()).toContain('Template Not Found');
  });
});
