import { Connected, DestroyContainer, Late, MessageType, SourceType } from 'silentium';
import Draggabilly from 'draggabilly';
import { ThePosition } from '../domain/Position';
import { PositionMultiplied } from '../domain/PositionMultiplied';

const defaultGridMultiplier = 15;

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
  const dragEndHandler = pointer => {
    let target = pointer.target;
    if (parentSelector) {
      target = pointer.target.closest(parentSelector);
    }
    const position: ThePosition = [target?.offsetLeft ?? 0, target?.offsetTop ?? 0];
    const positionMultiplied = PositionMultiplied(defaultGridMultiplier, position);
    dragEnd$.use(positionMultiplied);
  };
  const sub = el$.then(el => {
    dc.destroy();
    const dragging = new Draggabilly(el, {
      containment: true,
      grid: [defaultGridMultiplier, defaultGridMultiplier],
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
