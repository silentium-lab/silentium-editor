import LinkerLine from 'linkerline';
import { DestroyContainer, Message, MessageType } from 'silentium';
import { TheNode } from '../domain/Node';

export function Line(node$: MessageType<TheNode>) {
  const dc = DestroyContainer();
  return Message((resolve, reject) => {
    node$.catch(reject).then((node) => {
      dc.destroy();
      const relations = node.arrows ?? [];
      const fromEl = document.querySelector('.node-id-' + node.id);
      if (fromEl && relations.length) {
        relations.forEach(relation => {
          const toEl = document.querySelector('.node-id-' + relation.id);
          if (toEl) {
            const line = new LinkerLine({
              parent: document.body,
              start: fromEl,
              end: toEl,
            });
            dc.add(() => {
              console.log('remove line');
              line.remove();
            });
            resolve(line);
          }
        });
      }
    });
    return () => {
      dc.destroy();
    };
  });
}
