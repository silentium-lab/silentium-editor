import { DestroyContainer, MessageType } from "silentium";
import Draggabilly from 'draggabilly';

/**
 * The ability to drag elements
 */
export function Draggable(
    el$: MessageType<HTMLElement>,
    options: object = {
        containment: true,
        grid: [ 15, 15 ]
    }
    ) {
    const dc = DestroyContainer();
    return el$.then((el) => {
        dc.destroy();
        const dragging = new Draggabilly(el, options);
        dc.add(() => {
            dragging.destroy();
        })
    });
}
