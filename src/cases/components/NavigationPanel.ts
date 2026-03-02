import { Context } from 'silentium';
import { Template } from 'silentium-components';
import { ClassName, Clicked, html, Id } from 'silentium-ui';

export function NavigationPanel() {
  const close$ = Id();
  const closed$ = Clicked(ClassName(close$));
  const appContent$ = Context('app-file-content');
  closed$.then(() => {
    appContent$.use('');
  });
  return Template(
    t =>
      html`<div class="flex w-full justify-between">
        <div>Navigation</div>
        <a href="#" class="${t.escaped(close$)}">Закрыть</a>
      </div>`
  );
}
