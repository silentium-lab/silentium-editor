import { Directive, directive, ElementPart } from 'lit/directive.js';
import { render } from 'lit';

class PortalDirective extends Directive {
  private container = document.body; // Цель для портала

  render(template: unknown) {
    // Рендерим шаблон в целевой контейнер вне текущего Shadow DOM
    render(template, this.container);
    return null; // В текущем месте компонента ничего не выводится
  }
}

export const portal = directive(PortalDirective);
