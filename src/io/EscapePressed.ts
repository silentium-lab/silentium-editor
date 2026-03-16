import { Filtered, Of } from "silentium";
import { KeyPressed } from "silentium-ui";

export function EscapePressed() {
    return Filtered(KeyPressed(Of(document.body)), (e: KeyboardEvent) => e.key === 'Escape' || e.code === 'Escape');
}
