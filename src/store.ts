import { EmptyMap } from '@/app/MapEmpty';
import { atom } from 'nanostores';
import { Actions } from 'silentium-loop';

export const $store = atom({
    scrollPosition: [0, 0],
    map: EmptyMap()
});

export const dispatch = Actions(
    (fn: any) => $store.set(fn($store.get())),
    []
)
