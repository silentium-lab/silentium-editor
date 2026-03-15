import { Any, Computed, Connected, MessageSourceType, MessageType } from "silentium";
import { Template } from "silentium-components";
import { ClassName, Clicked, html, Id } from "silentium-ui";

export function Modal(
  title$: MessageType<string>,
  content$: MessageType<string>,
  opened$: MessageSourceType<boolean>
) {
  const closeId$ = Id();
  const closeClicked$ = Clicked(ClassName(closeId$));
  const bgId$ = Id();
  const bgClicked$ = Clicked(ClassName(bgId$));
  Any(closeClicked$, bgClicked$).then(() => {
    opened$.use(false);
  });
  const contentId$ = Id();
  const contentClicked$ = Clicked(ClassName(contentId$));
  contentClicked$.then((e) => {
    e.stopPropagation();
  });
  return Connected(Template(t => html`<div class="${t.escaped(Computed((opened) => opened ? 'fixed' : 'hidden', opened$))} bg-black/50 inset-0 flex items-center justify-center p-4 z-50 ${t.escaped(bgId$)}">
  <div class="${t.escaped(contentId$)} bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
    <div class="px-6 py-4 border-b border-gray-400 flex justify-between items-center">
      <h3 class="text-lg font-semibold text-gray-900">
        ${t.escaped(title$)}
      </h3>
      <button class="${t.escaped(closeId$)} cursor-pointer text-gray-400 hover:text-gray-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <div class="px-6 py-4 overflow-y-auto flex-1">
        ${t.raw(content$)}
    </div>
  </div>
</div>`), closeClicked$, bgClicked$, contentClicked$)
}
