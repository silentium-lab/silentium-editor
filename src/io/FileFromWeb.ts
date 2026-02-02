import { throttle } from 'lodash-es';
import { Applied, Late, MessageType, Value } from "silentium";

/**
 * An abstraction of a file from the file system
 */
export function FileFromWeb(changedContent$: MessageType<string>): MessageType<string> {
    let fileHandler$ = Late<FileSystemFileHandle>();
    const fileHandler = Value(fileHandler$);
    (async () => {
        const [fileHandle] = await window.showOpenFilePicker();
        fileHandler$.use(fileHandle);
    })();
    const fileContent$ = Value(Applied(fileHandler$, (handler) => {
        return handler.getFile().then(file => file.text()) as MessageType<string>;
    }));
    changedContent$.then(throttle(async (v) => {
        if (v !== fileContent$.value && v !== '' && fileHandler.value) {
            console.log('File new content:', v, fileHandler.value);
            const writableStream = await fileHandler.value.createWritable();
            await writableStream.write(v);
            await writableStream.close();
        }
    }, 500));
    return fileContent$;
}
