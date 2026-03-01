import { Context, Of } from 'silentium';

export function NodeTypeForm() {
  const typeId$ = Context('active-node-type-id');
  typeId$.then(console.log);
  return Of('<div></div>');
}
