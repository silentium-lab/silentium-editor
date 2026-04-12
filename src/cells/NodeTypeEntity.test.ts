import { describe, expect, test } from 'vitest';
import { NodeTypeCell } from './NodeTypeCell';

describe('NodeTypeEntity.test', () => {
  test('template in markup or svg', () => {
    const t = new NodeTypeCell(<any>{
      markup: 'template',
      svg: 'svg',
    });
    expect(t.template()).toBe('template');
  });

  test('use svg field if no template', () => {
    const t = new NodeTypeCell(<any>{
      svg: 'svg',
    });
    expect(t.template()).toBe('svg');
  });

  test('no template - error', () => {
    const t = new NodeTypeCell(<any>{
      id: 123,
    });
    expect(t.template()).toContain('Template Not Found');
  });
});
