import { partial } from 'lodash-es';
import { compose } from 'lodash/fp';
import { Any, Applied, ContextChain, ContextOf, DestroyContainer, Late, Of } from 'silentium';
import { Polling, Router } from 'silentium-components';
import { Render } from 'silentium-morphdom';
import { Element } from 'silentium-web-api';
import { PlatformName } from '../io/CapacitorPlatform';
import { FilePickedFromFS } from './components/FilePickedFromFS';
import { EditPage } from './pages/EditPage';
import { MainPage } from './pages/MainPage';
import { Application } from '../flows/Application';

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
  content$.then(v => {
    if (v === '') {
      dc.destroy();
    }
  });
  openFile$.then(() => {
    dc.destroy();
    const file$ = FilePickedFromFS(platform$, content$);
    content$.chain(file$);
    dc.add(file$);
  });
  closed$.then(() => {
    content$.use('');
  });
  const appModel = new Application();
  const router$ = Router<string>(
    Any(Applied(content$, compose(String, Boolean)), Polling(Of('false'), closed$)),
    [
      {
        condition: c => c === 'false',
        message: partial(MainPage.bind(appModel), openFile$),
      },
      {
        condition: c => c === 'true',
        message: partial(EditPage.bind(appModel), content$),
      },
    ],
    () => 'NotFound!'
  );
  return Render(Element('body .app'), router$);
}
