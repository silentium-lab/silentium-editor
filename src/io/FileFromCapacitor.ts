import { registerPlugin } from '@capacitor/core';
import { Connected, Late, Local, MessageType, Value } from 'silentium';

interface SAFPlugin {
  chooseFile(): Promise<{ uri: string }>;
  readFile(options: { uri: string }): Promise<{ content: string }>;
  writeFile(options: { uri: string; content: string }): Promise<void>;
}

const SAF = registerPlugin<SAFPlugin>('SAFPlugin');

/**
 * An abstraction of a file from the android
 */
export function FileFromAndroid(changedContent$: MessageType<string>) {
  const localContent$ = Local(changedContent$);
  const file$ = Late<any>();
  const file = Value(file$);
  const fileContent$ = Late<string>();
  SAF.chooseFile()
    .then(({ uri }) => {
      file$.use(uri);
      return SAF.readFile({ uri });
    })
    .then(({ content }) => {
      fileContent$.use(content);
    });
  localContent$.then(async v => {
    if (file.value) {
      await SAF.writeFile({ uri: file.value, content: v });
    }
  });
  return Connected<string>(fileContent$, localContent$);
}
