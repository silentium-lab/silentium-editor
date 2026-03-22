import { ContextChain, ContextOf, DestroyContainer, Late, MessageSourceType, Value } from "silentium";
import { TheMap } from "../domain/Map";
import { TheNodeType } from "../domain/NodeType";

export function MapType(map$: MessageSourceType<TheMap>) {
  const type$ = Late<TheNodeType>();
  ContextOf('map-type').then(ContextChain(type$));

  const map = Value(map$);
  type$.then(type => {
    map$.use({
      ...map.value,
      types: {
        ...map.value.types,
        [type.id]: type
      }
    });
  });

  const dc = DestroyContainer();
  dc.add(type$);

  return dc;
}
