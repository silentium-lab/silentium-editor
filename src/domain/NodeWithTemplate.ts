import { Node, TheNodeWithTemplate } from "./Node";
import { NodeType } from "./NodeType";

export function NodeWithTemplate(object: Node, types: NodeType[]): TheNodeWithTemplate {
    const type = types.find((ct) => String(ct.id) === String(object.type));
    if (!type) {
        return {
            node: object,
            template: '',
        };
    }
    let { markup } = type;
    if (object.additionalFields) {
        Object.entries(object.additionalFields).forEach(([key, value]) => {
            markup = markup.replaceAll(`\${${key}}`, value);
        });
    }
    ['width', 'height'].forEach((key) => {
        markup = markup.replaceAll(`\${${key}}`, (object as any)[key]);
    });

    return {
        node: object,
        template: markup,
    };
}
