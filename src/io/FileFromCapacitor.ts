import { registerPlugin } from '@capacitor/core';
import { Late, MessageType, Value } from "silentium";

interface SAFPlugin {
  chooseFile(): Promise<{ uri: string }>;
  readFile(options: { uri: string }): Promise<{ content: string }>;
  writeFile(options: { uri: string, content: string }): Promise<void>;
}

const SAF = registerPlugin<SAFPlugin>('SAFPlugin');

/**
 * An abstraction of a file from the android
 */
export function FileFromAndroid(changedContent$: MessageType<string>) {
  const file$ = Late<any>();
  const file = Value(file$);
  const fileContent$ = Late<string>();
  SAF.chooseFile().then(({uri}) => {
    file$.use(uri);
    return SAF.readFile({ uri });
  }).then(({ content }) => {
    fileContent$.use(content);
  });
  changedContent$.then(async (v) => {
    if (file.value) {
      await SAF.writeFile({ uri: file.value, content: v })
    }
  });
  return fileContent$;
}
