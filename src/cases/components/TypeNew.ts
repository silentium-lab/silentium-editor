import { Late } from 'silentium';
import { Template } from 'silentium-components';
import { Button, html, Mount } from 'silentium-ui';
import { Modal } from './Modal';
import { Tr } from '../../io/Translation';

const icon =
  '<svg style="width: 20px;height: 20px" class="svg-inline--fa fa-square-plus" data-prefix="fas" data-icon="square-plus" role="img" viewBox="0 0 448 512" aria-hidden="true"><path class="" fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path></svg>';

export function TypeNew() {
  const opened$ = Late(false);
  return Template(
    t =>
      html`<div class="w-full">
        ${t.raw(
          Mount(
            Modal(
              Tr('New Type'),
              Template(t => html`<div>form new template</div>`),
              opened$
            )
          )
        )}
        ${t.raw(Button(icon, 'btn w-full flex justify-center', opened$, '', true))}
      </div>`
  );
}
