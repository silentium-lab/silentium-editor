import { MessageSourceType, Source } from 'silentium';

export function JSONSource<T>(src: MessageSourceType<string>) {
  return Source<T>(
    (resolve, reject) => {
      src
        .then(v => {
          try {
            resolve(JSON.parse(v));
          } catch (e) {
            reject(e);
          }
        })
        .catch(reject);
    },
    v => {
      src.use(JSON.stringify(v));
    }
  );
}
