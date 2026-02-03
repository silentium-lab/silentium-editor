import { Encoding, Filesystem } from '@capacitor/filesystem';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Plugins } from '@capacitor/core';
import { Late, MessageType, Value } from "silentium";

/**
 * An abstraction of a file from the capacitor
 */
export function FileFromCapacitor(changedContent$: MessageType<string>) {
  const file$ = (Late<any>());
  const file = Value(file$);
  const fileContent$ = Late<string>();
  Capacitor.Plugins.SAF.openFile();
  readPickedFile().then((fileData) => {
    fileContent$.use(fileData.text);
    file$.use(fileData.file);
  });
  changedContent$.then(async (v) => {
    if (file.value) {
      console.log('write file');
      const wres = await Filesystem.writeFile({
        path: file.value.path,
        data: v,
        encoding: Encoding.UTF8,
      });
      console.log('write result11', wres);
    }
  });
  return fileContent$;
}

async function readPickedFile() {
  const file = await pickFile();

  const content = await Filesystem.readFile({
    path: file.path!, // content://...
    encoding: Encoding.UTF8,
  });

  return { file, text: content.data.toString() };
}

async function pickFile() {
  const result = await FilePicker.pickFiles({});

  const file = result.files[0];

  console.log('Имя:', file.name);
  console.log('MIME:', file.mimeType);
  console.log('URI:', file.path); // content://...

  return file;
}
