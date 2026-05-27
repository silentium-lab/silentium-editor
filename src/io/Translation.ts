import { Computed, MessageType, Of, Primitive } from 'silentium';
import { StorageRecord } from 'silentium-web-api';
import translationsRaw from './translation.json';

const translations = translationsRaw as Record<string, any>;
export const lang$ = StorageRecord(Of('lang'), 'en');

export function Tr(key: string): MessageType<string> {
  return Computed(l => translations[l][key] ?? key, lang$);
}

/**
 * Sync translation
 */
export function tr(key: string): string {
    return Primitive(Tr(key)).primitiveWithException();
}
