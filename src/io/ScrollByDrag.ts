import { DestroyContainer, MessageType } from 'silentium';
import ScrollBooster from 'scrollbooster';

export function ScrollByDrag(el$: MessageType<HTMLElement>) {
  const dc = DestroyContainer();
  return el$.then(el => {
    dc.destroy();
    const dragging = new ScrollBooster({
      viewport: el,
      scrollMode: 'transform',
      bounce: false,
    });
    dc.add(() => {
      dragging.destroy();
    });
  });
}
