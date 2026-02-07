import { values } from "lodash-es";
import { Applied, Computed, MessageType } from "silentium";
import { Path } from "silentium-components";
import { Map } from "../domain/Map";
import { Node, NodeWithTemplate } from "../domain/Node";
import { NodeType } from "../domain/NodeType";

export function NodesWithTemplate(map$: MessageType<Map>): MessageType<NodeWithTemplate[]> {
    const objects$ = Applied<unknown, Node[]>(Path<Node>(map$, 'objects'), values);
    const types$ = Path<NodeType[]>(map$, 'types');
    return Computed((objects, types) => {
        return objects.map((object) => {
          const type = types.find((ct) => String(ct.id) === String(object.type));
          if (!type) {
            return {
              obj: object,
              template: '',
            };
          }
          let { svg } = type;
          if (object.additionalFields) {
            Object.entries(object.additionalFields).forEach(([key, value]) => {
              svg = svg.replaceAll(`\${${key}}`, value);
            });
          }
          ['width', 'height'].forEach((key) => {
            svg = svg.replaceAll(`\${${key}}`, (object as any)[key]);
          });

          return {
            obj: object,
            template: svg,
          };
        });
    }, objects$, types$);
}
