import { TheNode, TheNodeWithTemplate } from "./Node";
import { TheNodeType } from "./NodeType";

export function NodeWithTemplate(object: TheNode, types: TheNodeType[]): TheNodeWithTemplate {
    const type = types.find((ct) => ct.name === object.type);
    if (!type) {
        return {
            node: object,
            template: '',
        };
    }
    let { markup } = type;
    if (!markup && 'svg' in type && typeof(type.svg) === 'string') {
        markup = type.svg;
    }
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
