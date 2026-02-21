import ScrollBooster from 'scrollbooster';
import { DestroyContainer, MessageType, SourceType } from 'silentium';
import { ThePoint } from '../domain/Point';

export function ScrollByDrag(el$: MessageType<HTMLElement>, position: SourceType<ThePoint>) {
  const dc = DestroyContainer();
  return el$.then(el => {
    dc.destroy();
    const dragging = new ScrollBooster({
      viewport: el,
      scrollMode: 'transform',
      bounce: false,
      emulateScroll: false,
      onUpdate: e => {
        position.use({
          ...e.position,
        });
      },
    });
    dc.add(() => {
      dragging.destroy();
    });
  });
}
