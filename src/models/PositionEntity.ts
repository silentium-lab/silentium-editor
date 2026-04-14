import { ThePosition } from '@/types/Position';

export class PositionEntity {
  public constructor(private position: ThePosition) {}

  public data() {
    return this.position;
  }

  public nearestMultipleOf(multiplier: number) {
    return new PositionEntity([
      Math.round(this.position[0] / multiplier) * multiplier,
      Math.round(this.position[1] / multiplier) * multiplier,
    ]);
  }
}
