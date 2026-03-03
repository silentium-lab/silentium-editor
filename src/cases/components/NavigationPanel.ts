import { Context } from 'silentium';
import { Template } from 'silentium-components';
import { ClassName, Clicked, html, Id } from 'silentium-ui';

export function NavigationPanel() {
  const close$ = Id();
  const closed$ = Clicked(ClassName(close$));
  const appClosed$ = Context('app-closed');
  closed$.then(e => {
    e.preventDefault();
    appClosed$.use(Date.now());
  });
  return Template(
    t =>
      html`<div class="flex w-full justify-between">
        <div>Navigation</div>
        <a href="#" class="${t.escaped(close$)}">Закрыть</a>
      </div>`
  );
}
