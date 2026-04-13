import { describe, expect, test } from 'vitest';
import { NodeModel } from './NodeModel';
import { NodeTypeModel } from './NodeTypeModel';

describe('NodeCell.test', () => {
  test('template', () => {
    const e = new NodeModel(
      <any>{ width: '100px' },
      new NodeTypeModel(<any>{ svg: '<b>${width}</b>' })
    );
    expect(e.template()).toBe('<b>100px</b>');
  });

  test('additionalFields from template', () => {
    const e = new NodeModel(<any>{}, new NodeTypeModel(<any>{ svg: '<b>${width}</b>' }));
    expect(e.additionalFields()).toStrictEqual({
      width: '',
    });
  });
});
