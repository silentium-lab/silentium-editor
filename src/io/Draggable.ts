import { Connected, DestroyContainer, Late, MessageType, SourceType } from 'silentium';
import Draggabilly from 'draggabilly';

/**
 * The ability to drag elements
 */
export function Draggable(
  el$: MessageType<HTMLElement>,
  options: object = {
    containment: true,
    grid: [15, 15],
  },
  nextPosition?: MessageType<[number, number]>
) {
  const dc = DestroyContainer();
  const dragEnd$ = Late([0, 0]);
  const sub = el$.then(el => {
    dc.destroy();
    const dragging = new Draggabilly(el, options);
    const dragEndHandler = (_, pointer) => {
      console.log(_, pointer);
      dragEnd$.use([pointer.pageX, pointer.pageY]);
    };
    dragging.on('dragEnd', dragEndHandler);
    if (nextPosition) {
      const nextPositionSub$ = nextPosition.then(p => {
        dragging.setPosition(p[0], p[1]);
      });
      dc.add(nextPositionSub$);
    }
    dc.add(() => {
      dragging.off('dragEnd', dragEndHandler);
      dragging.destroy();
    });
  });
  return Connected(dragEnd$, sub);
}
