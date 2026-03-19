import { Connected, DestroyContainer, Late, MessageSourceType, Of, Primitive, Value } from 'silentium';
import { Part, Polling, Template } from 'silentium-components';
import { Button, html, Input } from 'silentium-ui';
import { TheNodeType } from '../../domain/NodeType';
import { Tr } from '../../io/Translation';

export function TypeForm(type$: MessageSourceType<TheNodeType>) {
  const typeLocal$ = Late<TheNodeType>();
  const name$ = Part<string>(typeLocal$, 'name');
  const markup$ = Part<string>(typeLocal$, 'markup');
  const width$ = Part<string>(typeLocal$, 'width');
  const height$ = Part<string>(typeLocal$, 'height');
  const saved$ = Late(false);

  const dc = DestroyContainer();
  dc.add(
    type$.then(type => {
      typeLocal$.use(type);
    })
  );

  Polling(Of(Value(typeLocal$)), saved$).then((newType) => {
    type$.use(newType.value);
  });

  // border-1 border-gray-300 bg-white p-2 rounded-sm w-full
  return Connected<string>(
    Template(
      t =>
        html`<div>
          <div class="mb-2">
            <label>
              <b>
                ${t.escaped(Tr('Name'))}
              </b>
              <span class="block">
                ${t.raw(Input(name$))}
              </span>
            </label>
          </div>
          <div class="mb-2">
            <label>
              ${t.escaped(Tr('Code'))}
              ${t.raw(Input(markup$))}
            </label>
          </div>
          <div class="mb-2">
            <label>
              ${t.escaped(Tr('Width'))}
              ${t.raw(Input(width$))}
            </label>
          </div>
          <div class="mb-4">
            <label>
              ${t.escaped(Tr('Height'))}
              ${t.raw(Input(height$))}
            </label>
          </div>
          <div>${t.raw(Button(Tr('Save'), 'btn', saved$))}</div>
        </div>`
    ),
    dc
  );
}
