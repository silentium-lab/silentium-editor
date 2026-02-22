import LinkerLine from 'linkerline';
import { All, DestroyContainer, Message, MessageType } from 'silentium';
import { TheNode } from '../domain/Node';
import { Element } from 'silentium-web-api';

export function Line(node$: MessageType<TheNode>) {
  const arrowsArea$ = Element('.arrows-area');
  const dc = DestroyContainer();
  return Message((resolve, reject) => {
    All(node$, arrowsArea$)
      .catch(reject)
      .then(([node, arrowsArea]) => {
        console.log('draw arrows');
        dc.destroy();
        const relations = node.arrows ?? [];
        const fromEl = document.querySelector('.node-id-' + node.id);
        if (fromEl && relations.length) {
          relations.forEach(relation => {
            const toEl = document.querySelector('.node-id-' + relation.id);
            if (toEl) {
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
    return () => {
      dc.destroy();
      arrowsArea$.destroy();
    };
  });
}
