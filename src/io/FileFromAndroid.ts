import { MessageType, Of } from "silentium";
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Filesystem, Encoding } from '@capacitor/filesystem';

/**
 * An abstraction of a file from the android FS
 */
export async function FileFromAndroid(changedContent$: MessageType<string>) {
    return Of("content");
}

async function pickFile() {
  const result = await FilePicker.pickFiles({});

  const file = result.files[0];

  console.log('Имя:', file.name);
  console.log('MIME:', file.mimeType);
  console.log('URI:', file.path); // content://...

  return file;
}

async function readPickedFile() {
  const file = await pickFile();

  const content = await Filesystem.readFile({
    path: file.path!, // content://...
    encoding: Encoding.UTF8,
  });

  return { file, text: content.data };
}

async function saveBack() {
  const { file, text } = await readPickedFile();

  const updatedText =
    text + '\n\nИзменено через Capacitor 🚀';

  await Filesystem.writeFile({
    path: file.path!, // тот же content:// URI
    data: updatedText,
    encoding: Encoding.UTF8,
  });

  console.log('Файл сохранён');
}
