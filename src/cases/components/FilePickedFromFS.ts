import { Connected, Lazy, MessageSourceType, MessageType } from 'silentium';
import { Switch } from 'silentium-components';
import { partial } from 'lodash-es';
import { FileFromAndroid } from '../../io/FileFromCapacitor';
import { FileFromWeb } from '../../io/FileFromWeb';
import { Platform } from '../../io/Platform';

/**
 * Pick the file from a fs and
 * return its content
 */
export function FilePickedFromFS(
  platform$: MessageType<Platform>,
  content$: MessageSourceType<string>
) {
  const android$ = Lazy(partial(FileFromAndroid, content$));
  const web$ = Lazy(partial(FileFromWeb, content$));
  const file$ = Switch<string, Platform>(platform$, [
    ['android', android$],
    ['web', web$],
  ]);
  content$.chain(file$);
  return Connected(file$, android$, web$);
}
