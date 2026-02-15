import { partial } from 'lodash-es';
import { Late } from 'silentium';
import { Router } from 'silentium-components';
import { Render } from 'silentium-morphdom';
import { Element } from 'silentium-web-api';
import { PlatformName } from '../io/CapacitorPlatform';
import { FilePickedFromFS } from './components/FilePickedFromFS';
import { EditPage } from './pages/EditPage';
import { MainPage } from './pages/MainPage';

/**
 * The main application entrypoint
 */
export function App() {
  const content$ = Late('');
  const platform$ = PlatformName();
  const openFile$ = Late();
  openFile$.then(partial(FilePickedFromFS, platform$, content$));
  const router$ = Router<string>(
    content$,
    [
      {
        condition: c => c === '',
        message: partial(MainPage, openFile$),
      },
      {
        condition: c => c !== '',
        message: partial(EditPage, content$),
      },
    ],
    () => 'NotFound!'
  );
  return Render(Element('body .app'), router$);
}
