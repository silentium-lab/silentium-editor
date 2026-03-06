import { Connected, Destroyable, Lazy, MessageSourceType, MessageType } from 'silentium';
import { Switch } from 'silentium-components';
import { partial } from 'lodash-es';
import { FileFromAndroid } from '../../io/FileFromCapacitor';
import { FileFromWeb } from '../../io/FileFromWeb';
import { Platform } from '../../io/Platform';
import { LoggingProxy } from '../../tools/LoggingProxy';

/**
 * Pick the file from a fs and
 * return its content
 */
export function FilePickedFromFS(
  platform$: MessageType<Platform>,
  content$: MessageSourceType<string>
) {
  const android$ = Lazy(partial(FileFromAndroid, content$)).name('android$');
  const web$ = Lazy(partial(FileFromWeb, content$)).name('web$');
  const file$ = Switch<string, Platform>(platform$, [
    ['android', android$],
    ['web', web$],
  ]).name('file$');
  content$.chain(file$);
  return LoggingProxy(
    'Connected',
    Connected(
      LoggingProxy('file', file$),
      android$,
      web$,
      LoggingProxy(
        'destroyable',
        Destroyable(() => {
          console.log('d fpffs');
        })
      )
    ).name('Connected')
  );
}
