import { ClickWithoutDrag } from '@/io/ClickWithoutDrag';
import { NodeEntity } from '@/models/NodeEntity';
import { Connected, Context } from 'silentium';
import { Template } from 'silentium-components';
import { ClassName, html, Id } from 'silentium-ui';
import { Element } from 'silentium-web-api';

export function NodeTopName(node: NodeEntity) {
  const id$ = Id();
  const el$ = Element(ClassName(id$));
  const mapName$ = Context('active-map-name');
  const clicked$ = ClickWithoutDrag(el$);
  clicked$.then(() => {
    mapName$.use(node.url());
  });
  return Connected(
    Template(
      t =>
        html`<span class="${t.escaped(id$)} ${node.hasUrl() ? 'underline cursor-pointer' : ''}">
          ${node.topName()}
        </span>`
    ),
    id$,
    el$,
    clicked$,
    mapName$
  );
}
