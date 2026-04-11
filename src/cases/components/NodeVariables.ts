import {
  All,
  Applied,
  Connected,
  Late,
  Map,
  MessageSourceType,
  MessageType,
  Of,
  Primitive,
  Value,
} from 'silentium';
import { Path, Template } from 'silentium-components';
import { html, Input } from 'silentium-ui';
import { Tr } from '../../io/Translation';

export function NodeVariables(vars$: MessageSourceType<Record<string, string>>) {
  const entries$ = Applied(vars$, v => Object.entries(v));
  return Template(
    t =>
      html`<div>
        ${t.raw(
        Applied(Map(entries$, NodeVariable.bind(null, vars$)), arr =>
          arr.length ? arr.join('') : '-'
        )
      )}
      </div>`
  );
}

function NodeVariable(
  vars$: MessageSourceType<Record<string, string>>,
  theVar: MessageType<[string, string]>
) {
  const varModel = Late<string>('');
  const sub = varModel.chain(Path(theVar, '1'));
  const varVal = Primitive(theVar);
  All(Of(Value(vars$)), varModel).then(([vars, v]) => {
    vars$.use({
      ...vars.value,
      [varVal.primitiveWithException()[0]]: v,
    });
  });
  return Connected(
    Template(
      t =>
        html`<div class="mb-1">
          ${t.escaped(Tr('Variable: '))} #${t.escaped(Path(theVar, '0'))} ${t.raw(Input(varModel))}
        </div>`
    ),
    sub
  );
}
