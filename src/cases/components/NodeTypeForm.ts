import { Connected, Context, Of } from 'silentium';

export function NodeTypeForm() {
  const typeId$ = Context('active-node-type-id');
  typeId$.then(console.log);
  return Connected<string>(Of('<div></div>'), typeId$);
}
