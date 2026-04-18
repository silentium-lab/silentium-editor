import { PlatformName } from '@/io/CapacitorPlatform';
import { partial } from 'lodash-es';
import { compose } from 'lodash/fp';
import { Any, Applied, ContextChain, ContextOf, DestroyContainer, Late, Of } from 'silentium';
import { Polling, Router } from 'silentium-components';
import { Render } from 'silentium-morphdom';
import { Element } from 'silentium-web-api';
import { FilePickedFromFS } from './components/FilePickedFromFS';
import { MainPage } from './pages/MainPage';
import '@/views/pages/EditPageLit';

/**
 * The main application entrypoint
 */
export function App() {
  const closed$ = Late();
  ContextOf('app-closed').then(ContextChain(closed$));
  const content$ = Late('');
  ContextOf('active-content').then(ContextChain(content$));
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
  const router$ = Router<string>(
    Any(Applied(content$, compose(String, Boolean)), Polling(Of('false'), closed$)),
    [
      {
        condition: c => c === 'false',
        message: partial(MainPage, openFile$),
      },
      {
        condition: c => c === 'true',
        message: () => '<edit-page-lit></edit-page-lit>',
      },
    ],
    () => 'NotFound!'
  );
  return Render(Element('body .app'), router$);
}
