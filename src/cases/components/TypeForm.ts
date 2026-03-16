import { Connected, DestroyContainer, Late, MessageSourceType } from 'silentium';
import { Part, Template } from 'silentium-components';
import { Button, ClassName, Clicked, html, Id, Input } from 'silentium-ui';
import { TheNodeType } from '../../domain/NodeType';

export function TypeForm(type$: MessageSourceType<TheNodeType>) {
  const typeLocal$ = Late<TheNodeType>();
  const name$ = Part<string>(typeLocal$, 'name');
  const markup$ = Part<string>(typeLocal$, 'markup');
  const width$ = Part<string>(typeLocal$, 'width');
  const height$ = Part<string>(typeLocal$, 'height');
  const saved$ = Late();

  const dc = DestroyContainer();
  dc.add(
    type$.then(type => {
      typeLocal$.use(type);
    })
  );

  typeLocal$.then(newType => {
    type$.use(newType);
  });

  return Connected<string>(
    Template(
      t =>
        html`<div>
          <div>
            <label> Name ${t.raw(Input(name$))} </label>
          </div>
          <div>
            <label> Code ${t.raw(Input(markup$))} </label>
          </div>
          <div>
            <label> Width ${t.raw(Input(width$))} </label>
          </div>
          <div>
            <label> Height ${t.raw(Input(height$))} </label>
          </div>
          <div>${t.raw(Button('Save', 'btn', saved$))}</div>
        </div>`
    ),
    dc
  );
}
