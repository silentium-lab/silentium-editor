export class DateModel {
  public constructor(private d: Date) { }

  public readable() {
    return this.d.toLocaleDateString();
  }

  public static fromTimestamp(ts: string | number) {
    return new DateModel(new Date(ts));
  }
}
