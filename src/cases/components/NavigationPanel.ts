import { Connected, Context, Late } from 'silentium';
import { Template } from 'silentium-components';
import { Button, html } from 'silentium-ui';

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
          <div>Navigation</div>
          ${t.raw(Button('&times;', 'btn', closed$))}
        </div>`
    ),
    closed$
  );
}
