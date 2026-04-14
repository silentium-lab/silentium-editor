import { PositionEntity } from '@/models/PositionEntity';
import { ThePosition } from '@/types/Position';
import Draggabilly from 'draggabilly';
import { Connected, DestroyContainer, Late, MessageType } from 'silentium';

const defaultGridMultiple = 15;

/**
 * The ability to drag elements
 */
export function Draggable(
  el$: MessageType<HTMLElement>,
  options: object = {},
  nextPosition?: MessageType<[number, number]>,
  parentSelector: string = ''
) {
  const dc = DestroyContainer();
  const dragEnd$ = Late<ThePosition>();
  const dragEndHandler = (pointer: any) => {
    let target = pointer.target;
    if (parentSelector) {
      target = pointer.target.closest(parentSelector);
    }
    const position: ThePosition = [target?.offsetLeft ?? 0, target?.offsetTop ?? 0];
    dragEnd$.use(new PositionEntity(position).nearestMultipleOf(defaultGridMultiple).data());
  };
  const sub = el$.then(el => {
    dc.destroy();
    const dragging = new Draggabilly(el, {
      containment: true,
      grid: [defaultGridMultiple, defaultGridMultiple],
      ...options,
    });
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
