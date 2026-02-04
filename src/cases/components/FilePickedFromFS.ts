import { Lazy, MessageSourceType, MessageType } from "silentium";
import { Switch } from "silentium-components";
import { partial } from "lodash-es";
import { FileFromCapacitor } from "../../io/FileFromCapacitor";
import { FileFromWeb } from "../../io/FileFromWeb";
import { Platform } from "../../io/Platform";

/**
 * Pick the file from a fs and
 * return its content
 */
export function FilePickedFromFS(platform$: MessageType<Platform>, content$: MessageSourceType<string>) {
    const file$ = Switch<string, Platform>(platform$, [
      ['android', Lazy(partial(FileFromCapacitor, content$))],
      ['web', Lazy(partial(FileFromWeb, content$))],
    ]);
    content$.chain(file$);
    return file$;
}
