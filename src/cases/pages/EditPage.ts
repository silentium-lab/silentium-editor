import { MessageSourceType } from "silentium";
import { Template } from "silentium-components";

export function EditPage(content$: MessageSourceType<string>) {
    return Template((t) => `<div>
        <p>Edit page!</p>
        <pre>${t.raw(content$)}</pre>
    </div>`);
}
