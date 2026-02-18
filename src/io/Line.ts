import LinkerLine from 'linkerline';
import { Computed, MessageType } from 'silentium';
import { TheNode } from '../domain/Node';

export function Line(node$: MessageType<TheNode>) {
  return Computed(node => {
    const relations = node.arrows ?? [];
    const fromEl = document.querySelector('.node-id-' + node.id);
    if (fromEl && relations.length) {
      relations.forEach(relation => {
        const toEl = document.querySelector('.node-id-' + relation.id);
        if (toEl) {
          new LinkerLine({
            start: fromEl,
            end: toEl,
          });
        }
      });
    }
  }, node$);
}
