import { NodesWithTemplate } from './NodesWithTemplate';
import { FakeMap, TheMap } from '../domain/Map';
import { MessageType, Of, Promisify, Void } from 'silentium';
import { describe, expect, test } from 'vitest';

describe('NodesWithTemplate', () => {
  test('should return nodes with templates when types match', async () => {
    const map: MessageType<TheMap> = Of(FakeMap());
    const result = NodesWithTemplate(map);
    await expect(Promisify(result)).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ template: "<div class='node'>The description</div>" }),
      ])
    );
  });
});
