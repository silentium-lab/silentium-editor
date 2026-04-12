import { describe, expect, test } from 'vitest';
import { NodeCell } from './NodeCell';
import { NodeTypeCell } from './NodeTypeCell';

describe('NodeCell.test', () => {
  test('template', () => {
    const e = new NodeCell(
      <any>{ width: '100px' },
      new NodeTypeCell(<any>{ svg: '<b>${width}</b>' })
    );
    expect(e.template()).toBe('<b>100px</b>');
  });

  test('additionalFields from template', () => {
    const e = new NodeCell(<any>{}, new NodeTypeCell(<any>{ svg: '<b>${width}</b>' }));
    expect(e.additionalFields()).toStrictEqual({
      width: '',
    });
  });
});
