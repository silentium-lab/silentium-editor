import { NodeModel } from "@/models/NodeEntity";
import { Connected } from "silentium";
import { Template } from "silentium-components";
import { ClassName, Clicked, html, Id } from "silentium-ui";

export function NodeTopName(node: NodeModel) {
  const id$ = Id();
  const clicked$ = Clicked(ClassName(id$));
  const sub = clicked$.then(() => {
    if (node.url()) {
      console.log('open', node.url());
    }
  })
  return Connected(Template(t => html`<span class="${t.escaped(id$)} ${node.hasUrl() ? 'underline' : ''}">
    ${node.topName()}
  </span>`), clicked$, sub);
}
