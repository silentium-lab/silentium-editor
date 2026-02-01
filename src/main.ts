import { SplashScreen } from '@capacitor/splash-screen';
import { DevTools } from 'silentium';
import { App } from './cases/App';

DevTools();
window.customElements.define(
  'main-app',
  class extends HTMLElement {
    constructor() {
      super();
      SplashScreen.hide();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = '<div class="app"></div>';
      const app = root.querySelector('.app');
      if (app) {
        App(app);
      }
    }
  },
);
