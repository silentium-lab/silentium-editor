import { SplashScreen } from '@capacitor/splash-screen';

window.customElements.define(
  'main-app',
  class extends HTMLElement {
    constructor() {
      super();
      SplashScreen.hide();
      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
      <div>
      Application here
      </div>
    `;
    }
  },
);
