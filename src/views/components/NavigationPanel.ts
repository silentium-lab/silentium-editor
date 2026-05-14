import { Connected, Context, Late, Of } from 'silentium';
import { Template } from 'silentium-components';
import { Button, html } from 'silentium-ui';
import logo from '@/assets/imgs/logo.svg';
import { MapEntity } from '@/models/MapEntity';

export function NavigationPanel(map: MapEntity) {
  const closed$ = Late<Event>();
  const appClosed$ = Context('app-closed');
  closed$.then(e => {
    e.preventDefault();
    appClosed$.use(Date.now());
  });
  const back$ = Late();
  const mapName$ = Context('active-map-name');
  back$.then(() => {
    mapName$.use(map.parent());
  });
  return Connected<string>(
    Template(
      t =>
        html`<div class="flex w-full justify-between">
          <div class="flex gap-2 justify-center items-center">
            <img src="${logo}" width="35" height="35" class="mx-auto" alt="" />
            <strong>SilentiumEditor</strong>
          </div>
          ${t.raw(map.hasParent() ? Button('Назад', 'ml-auto mr-2 underline', back$) : Of(''))}
          ${t.raw(Button('&times;', 'btn', closed$))}
        </div>`
    ),
    closed$,
    back$
  );
}
