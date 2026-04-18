import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-example')
export class LitExample extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
      border: 2px solid #3498db;
      border-radius: 8px;
      background-color: #f8f9fa;
      font-family: Arial, sans-serif;
      margin: 10px;
    }

    h2 {
      color: #2c3e50;
      margin-top: 0;
    }

    .counter {
      font-size: 24px;
      font-weight: bold;
      color: #e74c3c;
      margin: 10px 0;
    }

    button {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px;
      font-size: 14px;
    }

    button:hover {
      background-color: #2980b9;
    }

    button.reset {
      background-color: #e74c3c;
    }

    button.reset:hover {
      background-color: #c0392b;
    }
  `;

  @property({ type: Number })
  count = 0;

  private increment() {
    this.count++;
  }

  private decrement() {
    if (this.count > 0) this.count--;
  }

  private reset() {
    this.count = 0;
  }

  render() {
    return html`
      <h2>Lit Web Component Example</h2>
      <p>This component demonstrates Lit library integration.</p>
      <div class="counter">Count: ${this.count}</div>
      <div>
        <button @click=${this.increment}>Increment</button>
        <button @click=${this.decrement}>Decrement</button>
        <button class="reset" @click=${this.reset}>Reset</button>
      </div>
      <p><small>Lit v${import.meta.env?.VITE_LIT_VERSION || '3.3.2'} successfully installed!</small></p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-example': LitExample;
  }
}
