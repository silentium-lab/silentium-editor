import { partial } from 'lodash-es';
import { Any, Applied, ContextChain, ContextOf, DestroyContainer, Late, Of } from 'silentium';
import { Polling, Router } from 'silentium-components';
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
  const closed$ = Late();
  ContextOf('app-closed').then(ContextChain(closed$));
  const content$ = Late('');
  const platform$ = PlatformName();
  const openFile$ = Late();
  const dc = DestroyContainer();
  openFile$.then(() => {
    dc.destroy();
    dc.add(FilePickedFromFS(platform$, content$));
  });
  closed$.then(() => {
    content$.use('');
  });
  const router$ = Router<string>(
    Any(Applied(content$, compose(String, Boolean)), Polling(Of('false'), closed$)),
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
