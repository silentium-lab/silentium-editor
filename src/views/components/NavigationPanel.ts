import { Connected, Context, Late } from 'silentium';
import { Template } from 'silentium-components';
import { Button, html } from 'silentium-ui';
import logo from '@/assets/imgs/logo.svg';

export function NavigationPanel() {
  const closed$ = Late<Event>();
  const appClosed$ = Context('app-closed');
  closed$.then(e => {
    e.preventDefault();
    appClosed$.use(Date.now());
  });
  return Connected<string>(
    Template(
      t =>
        html`<div class="flex w-full justify-between">
          <div class="flex gap-2 justify-center items-center">
            <img src="${logo}" width="35" height="35" class="mx-auto" alt="" />
            <strong>SilentiumEditor</strong>
          </div>
          ${t.raw(Button('&times;', 'btn', closed$))}
        </div>`
    ),
    closed$
  );
}
