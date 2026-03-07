import { throttle } from 'lodash-es';
import { Applied, Connected, Late, Local, MessageType, Value } from 'silentium';

/**
 * An abstraction of a file from the web file system
 */
export function FileFromWeb(changedContent$: MessageType<string>): MessageType<string> {
  const localContent$ = Local(changedContent$);
  let fileHandler$ = Late<FileSystemFileHandle>();
  const fileHandler = Value(fileHandler$);
  // @ts-ignore
  window.showOpenFilePicker().then(([fileHandle]) => {
    fileHandler$.use(fileHandle);
  });
  const fileContent$ = Value(
    Applied(fileHandler$, handler => {
      return handler.getFile().then(file => file.text()) as MessageType<string>;
    })
  );
  localContent$.then(
    throttle(async v => {
      if (v !== fileContent$.value && v !== '' && fileHandler.value) {
        const writableStream = await fileHandler.value.createWritable();
        await writableStream.write(v);
        await writableStream.close();
      }
    }, 500)
  );
  return Connected(fileContent$, localContent$);
}
