import { SplashScreen } from '@capacitor/splash-screen';
import { DevTools, Void } from 'silentium';
import { App } from './cases/App';
import { DomLoaded } from './io/DomLoaded';

DevTools();
SplashScreen.hide();
DomLoaded().then(() => {
  App().then(Void());
}).then(Void());
