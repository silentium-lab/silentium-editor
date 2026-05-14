import { MapEntity } from '@/models/MapEntity';
import { createContext } from '@lit/context';

export const mapContext = createContext<MapEntity>('map');
