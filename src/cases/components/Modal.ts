import { Any, Computed, Connected, MessageSourceType, MessageType, Value } from 'silentium';
import { Template } from 'silentium-components';
import { ClassName, Clicked, html, Id } from 'silentium-ui';
import { EscapePressed } from '../../io/EscapePressed';

export function Modal(
  title$: MessageType<string>,
  content$: MessageType<string>,
  opened$: MessageSourceType<boolean>
) {
  const contentId$ = Id();
  const closeId$ = Id();
  const closeClicked$ = Clicked(ClassName(closeId$));
  const bgId$ = Id();
  const bgClicked$ = Clicked(ClassName(bgId$));
  bgClicked$.then(e => {
    const bgId = Value(bgId$);
    if ((e.target as HTMLElement).classList.contains(bgId.value)) {
      opened$.use(false);
    }
  });
  closeClicked$.then(() => {
    opened$.use(false);
  });
  const titleId$ = Id();
  const escape$ = EscapePressed();
  escape$.then(() => {
    opened$.use(false);
  });
  return Connected(
    Template(
      t =>
        html`<div
          class="${t.escaped(
            Computed(opened => (opened ? 'fixed' : 'hidden'), opened$)
          )} bg-black/50 inset-0 flex items-center justify-center p-4 z-50 ${t.escaped(bgId$)}"
        >
          <div
            class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col relative"
          >
            <button
              class="${t.escaped(
                closeId$
              )} top-2 right-2 absolute cursor-pointer text-gray-400 hover:text-gray-600"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div
              class="${t.escaped(
                titleId$
              )} px-6 py-4 border-b border-gray-400 flex justify-between items-center"
            >
              <h3 class="text-lg font-semibold text-gray-900">${t.escaped(title$)}</h3>
            </div>
            <div class="${t.escaped(contentId$)} px-6 py-4 overflow-y-auto flex-1">
              ${t.raw(content$)}
            </div>
          </div>
        </div>`
    ),
    closeClicked$,
    bgClicked$,
    escape$
  );
}
