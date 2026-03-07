import { Connected, Context } from 'silentium';
import { Template } from 'silentium-components';
import { ClassName, Clicked, html, Id } from 'silentium-ui';
import { Connect } from 'vite';

export function NavigationPanel() {
  const close$ = Id();
  const closed$ = Clicked(ClassName(close$));
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
          <a href="#" class="${t.escaped(close$)}">Закрыть</a>
        </div>`
    ),
    closed$
  );
}
