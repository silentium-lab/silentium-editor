import { html, render, TemplateResult } from 'lit';
import { directive } from 'lit/directive.js';
import { AsyncDirective } from 'lit/async-directive.js';

class MultiPortalDirective extends AsyncDirective {
  private portalContainer?: HTMLDivElement;

  // Главный метод, управляющий жизненным циклом
  update(_part: unknown, [template, target]: [TemplateResult, HTMLElement?]) {
    const hostContainer = target || document.body;

    // 1. Создаем персональный контейнер для этого вызова, если его еще нет
    if (!this.portalContainer) {
      this.portalContainer = document.createElement('div');
      hostContainer.appendChild(this.portalContainer);
    }

    // 2. Рендерим шаблон внутрь этого персонального контейнера
    render(template, this.portalContainer);

    // Возвращаем пустую строку, чтобы в самом компоненте ничего не занимало место
    return '';
  }

  render(_template: TemplateResult, _target?: HTMLElement) {
    return '';
  }

  // 3. Очистка DOM при удалении компонента (важно для предотвращения утечек памяти)
  disconnected() {
    if (this.portalContainer) {
      this.portalContainer.remove();
    }
  }

  reconnected() {
    // Если элемент вернулся в DOM, директива автоматически перерендерится через update
  }
}

export const portal = directive(MultiPortalDirective);
