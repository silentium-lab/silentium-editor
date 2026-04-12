import { Connected, Filtered, Late, MessageSourceType, MessageType, Of, Primitive } from 'silentium';
import { Part, Polling, Template } from 'silentium-components';
import { html, Input, Textarea } from 'silentium-ui';
import { NodeType } from '@/entities/NodeType';
import { Tr } from '@/io/Translation';

export function TypeForm(type$: MessageSourceType<NodeType>, saved$: MessageType<boolean>) {
  const typeLocal$ = Late<NodeType>();
  const name$ = Part<string>(typeLocal$, 'name');
  const markup$ = Part<string>(typeLocal$, 'markup');
  const width$ = Part<string>(typeLocal$, 'width');
  const height$ = Part<string>(typeLocal$, 'height');

  const typeSub = type$.then(type => {
    typeLocal$.use(type);
  });

  Polling(Of(Primitive(typeLocal$)), Filtered(saved$, Boolean)).then(newType => {
    type$.use(newType.primitiveWithException());
  });

  return Connected<string>(
    Template(
      t =>
        html`<div>
          <div class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Name'))} </b>
              <span class="block"> ${t.raw(Input(name$))} </span>
            </label>
          </div>
          <div class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Code'))} </b>
              ${t.raw(
          Textarea(markup$, 'border-1 border-gray-300 bg-white p-2 rounded-sm w-full h-24')
        )}
            </label>
          </div>
          <div class="mb-2">
            <label>
              <b> ${t.escaped(Tr('Width'))} </b>
              ${t.raw(Input(width$))}
            </label>
          </div>
          <div class="mb-4">
            <label>
              <b> ${t.escaped(Tr('Height'))} </b>
              ${t.raw(Input(height$))}
            </label>
          </div>
        </div>`
    ),
    typeSub
  );
}
