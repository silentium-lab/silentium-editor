import { partial } from 'lodash-es';
import { Applied, Late } from 'silentium';
import { Router } from 'silentium-components';
import { Render } from 'silentium-morphdom';
import { Element } from 'silentium-web-api';
import { PlatformName } from '../io/CapacitorPlatform';
import { FilePickedFromFS } from './components/FilePickedFromFS';
import { EditPage } from './pages/EditPage';
import { MainPage } from './pages/MainPage';
import { compose } from 'lodash/fp';

/**
 * The main application entrypoint
 */
export function App() {
  const content$ = Late('');
  const platform$ = PlatformName();
  const openFile$ = Late();
  openFile$.then(partial(FilePickedFromFS, platform$, content$));
  const router$ = Router<string>(
    Applied(content$, compose(String, Boolean)),
    [
      {
        condition: c => c === 'false',
        message: partial(MainPage, openFile$),
      },
      {
        condition: c => c === 'true',
        message: partial(EditPage, content$),
      },
    ],
    () => 'NotFound!'
  );
  return Render(Element('body .app'), router$);
}
