export class DateEntity {
  public constructor(private d: Date) { }

  public readable() {
    return this.d.toLocaleDateString();
  }

  public static fromTimestamp(ts: string | number) {
    return new DateEntity(new Date(ts));
  }
}
