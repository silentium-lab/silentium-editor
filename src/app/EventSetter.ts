import invariant from 'ts-invariant';

export function EventSetter(setter: (v: any) => void) {
  return (e: CustomEvent) => {
    invariant(
      e.detail !== undefined,
      'EventSetter: onChange hook receives event.details with undefined'
    );
    setter(e.detail);
  };
}
