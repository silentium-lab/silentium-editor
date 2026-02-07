import { Computed, Of, Value } from "silentium";
import { StorageRecord } from "silentium-web-api";
import translationsRaw from './translation.json';

const translations = translationsRaw as Record<string, any>;
type Languages = 'ru' | 'en';
const lang$ = Value<Languages>(StorageRecord(Of('lang'), 'en'));

export function Tr(key: string) {
    return Computed((l) => translations[l][key], lang$);
}
