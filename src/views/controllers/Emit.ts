import { LitElement } from "lit";

export function Emit<T>(
    host: any,
    getValue: (e: Event) => unknown
) {
    return (e: Event) => {
        const field = host.field;
        const object = host.object;
        host.dispatchEvent(
            new CustomEvent('model-updated', {
                detail: {
                    ...object,
                    [field]: getValue(e)
                }
            })
        );
    }
}
