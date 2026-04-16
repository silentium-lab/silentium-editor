import { MessageSourceType } from 'silentium';
import { Template } from 'silentium-components';
import { Button, html } from 'silentium-ui';
import { lang$, Tr } from '@/io/Translation';
import logo from '@/assets/imgs/logo.svg';

export function MainPage(openFile$: MessageSourceType) {
  return Template(
    t =>
      html`<div class="container mx-auto px-3 py-3 h-full flex flex-col">
        <img src="${logo}" width="150" height="150" class="mx-auto" alt="" />
        <div class="w-40 mx-auto">
          <div class="mb-2 text-center w-full">${t.raw(Tr('Choose the file to edit'))}</div>
          <div class="mb-2">${t.raw(Button(Tr('Open file'), 'btn w-full', openFile$))}</div>
          <div class="mb-2">
            ${t.raw(Button('English', 'btn w-full', lang$, '', 'en'))}
          </div>
          <div class="mb-2">
            ${t.raw(Button('Русский', 'btn w-full', lang$, '', 'ru'))}
          </div>
        </div>
      </div>`
  );
}
