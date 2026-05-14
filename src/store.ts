import { EmptyMap } from '@/app/MapEmpty';
import { atom } from 'nanostores';
import { Actions } from 'silentium-loop';

export const $mapStore = atom(EmptyMap());

export const mapDispatch = Actions((fn: any) => $mapStore.set(fn($mapStore.get())), []);

export const $appStore = atom({
  position: [0, 0],
});
