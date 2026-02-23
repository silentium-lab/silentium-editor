import { Actual, Applied, MaybeMessage } from 'silentium';
import { Element } from 'silentium-web-api';

export function ElementGeometry(selector: MaybeMessage<string>) {
  const el$ = Element(Actual(selector));
  return Applied(el$, el => {
    return el.getBoundingClientRect();
  });
}
