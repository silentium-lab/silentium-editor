import { MessageType } from "silentium";
import { Template } from "silentium-components";
import { html } from "silentium-ui";

export function Modal(content$: MessageType<string>) {
    return Template(t => html`<div class="fixed inset-0 flex items-center justify-center p-4">
  <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
    <div class="px-6 py-4 border-b flex justify-between items-center">
      <h3 class="text-lg font-semibold text-gray-900">Modal title</h3>
      <button class="text-gray-400 hover:text-gray-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <div class="px-6 py-4 overflow-y-auto flex-1">
        ${t.raw(content$)}
    </div>
    <div class="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-2">
      <button class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
        Close
      </button>
    </div>
  </div>
</div>`)
}
