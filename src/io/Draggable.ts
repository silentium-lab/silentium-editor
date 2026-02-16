import { Connected, DestroyContainer, Late, MessageType, SourceType } from 'silentium';
import Draggabilly from 'draggabilly';
import { ThePosition } from '../domain/Position';

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
  const dragEnd$ = Late<ThePosition>();
  const dragEndHandler = pointer => {
    const target = pointer.target.closest('.select-none');
    dragEnd$.use([target?.offsetLeft ?? 0, target?.offsetTop ?? 0]);
  };
  const sub = el$.then(el => {
    dc.destroy();
    const dragging = new Draggabilly(el, options);
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
    return dc.destructor;
  });
  return Connected<ThePosition>(dragEnd$, sub);
}
