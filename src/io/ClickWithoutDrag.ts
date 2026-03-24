import Hammer from 'hammerjs';
import { Destroyable, DestroyContainer, ExecutorApplied, Message, MessageType } from 'silentium';

export function ClickWithoutDrag(el$: MessageType<HTMLElement>) {
  const dc = DestroyContainer();
  return Message((resolve, reject) => {
    const sub = Destroyable(
      el$.catch(reject).then(el => {
        dc.destroy();
        const mc = new Hammer(el);
        dc.add(mc);
        mc.on('tap', function (ev) {
          resolve(ev);
        });
      })
    );
    return () => {
      dc.destroy();
      sub.destroy();
    };
  });
}
