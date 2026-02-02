import { Applied, Late, MessageType, Source, Value } from "silentium";
import { throttle } from 'lodash-es';

/**
 * An abstraction of a file from the file system
 */
export function FileFromFS() {
    let fileHandler$ = Late<FileSystemFileHandle>();
    const fileHandler = Value(fileHandler$);
    (async () => {
        const [fileHandle] = await window.showOpenFilePicker();
        fileHandler$.use(fileHandle);
    })();
    const fileContent$ = Value(Applied(fileHandler$, (handler) => {
        return handler.getFile().then(file => file.text()) as MessageType<string>;
    }));
    return Source<string>(
        (resolve, reject) => {
            fileContent$.then(resolve).catch(reject)
        },
        throttle(async (v) => {
            if (v !== fileContent$.value && v !== '' && fileHandler.value) {
                console.log('File new content:', v, fileHandler.value);
                const writableStream = await fileHandler.value.createWritable();
                await writableStream.write(v);
                await writableStream.close();
            }
        }, 500)
    )
}
