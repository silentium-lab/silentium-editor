import LinkerLine from 'linkerline';
import { All, Connected, DestroyContainer, Message, MessageType } from 'silentium';
import { TheNode } from '@/types/Node';
import { Element } from 'silentium-web-api';

export function Line(node$: MessageType<TheNode>) {
  const arrowsArea$ = Element('.arrows-area');
  const dc = DestroyContainer();
  return Connected(
    Message((resolve, reject) => {
      All(node$, arrowsArea$)
        .catch(reject)
        .then(([node, arrowsArea]) => {
          dc.destroy();
          const relations = node.arrows ?? [];
          const fromEl = document.querySelector('.node-id-' + node.id);
          if (fromEl && relations.length) {
            relations.forEach(relation => {
              const toEl = document.querySelector('.node-id-' + relation.id);
              if (toEl) {
                if (toEl === fromEl) {
                  throw new Error(`Line: self link detected`);
                }
                const line = new LinkerLine({
                  parent: arrowsArea,
                  start: fromEl,
                  end: toEl,
                });
                dc.add(() => {
                  line.remove();
                });
                resolve(line);
              }
            });
          }
        });
    }),
    dc,
    arrowsArea$
  );
}
