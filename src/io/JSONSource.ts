import { DestroyContainer, MessageSourceType, Source } from 'silentium';

export function JSONSource<T>(src: MessageSourceType<string>) {
  return Source<T>(
    (resolve, reject) => {
      const dc = DestroyContainer();
      dc.add(
        src
          .then(v => {
            try {
              resolve(JSON.parse(v));
            } catch (e) {
              reject(e);
            }
          })
          .catch(reject)
      );
      return dc.destructor();
    },
    v => {
      src.use(JSON.stringify(v));
    }
  );
}
