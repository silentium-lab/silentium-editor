export function LoggingProxy(name: string, target, logger = console.log) {
  return new Proxy(target, {
    get(obj, prop: any) {
      const value = obj[prop];

      // Если свойство - функция, оборачиваем её
      if (typeof value === 'function') {
        return function (...args) {
          logger(name, `Calling ${prop} with:`, args);
          const result = value.apply(this, args);
          logger(name, `${prop} returned:`, result);
          return result;
        };
      }

      return value;
    },
  });
}
