import { describe, expect, test } from 'vitest';
import { NodeModel } from './NodeEntity';
import { NodeTypeEntity } from './NodeTypeEntity';

describe('NodeEntity.test', () => {
  test('template', () => {
    const e = new NodeModel(
      <any>{ width: '100px' },
      new NodeTypeEntity(<any>{ svg: '<b>${width}</b>' })
    );
    expect(e.template()).toBe('<b>100px</b>');
  });

  test('additionalFields from template', () => {
    const e = new NodeModel(<any>{}, new NodeTypeEntity(<any>{ svg: '<b>${width}</b>' }));
    expect(e.additionalFields()).toStrictEqual({
      width: '',
    });
  });
});
