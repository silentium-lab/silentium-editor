import { Position } from './Position';

/**
 * Represents a position that is a multiple of a given number.
 */
export function PositionMultiplied(multiplier: number, position: Position): Position {
  return [
    Math.round(position[0] / multiplier) * multiplier,
    Math.round(position[1] / multiplier) * multiplier,
  ];
}
