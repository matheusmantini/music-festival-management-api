export class Show {
  constructor(
    private weekDay: string,
    private startTime: number,
    private endTime: number,
    private bandId: string
  ) {}

  public getWeekDay = (): string => {
    return this.weekDay;
  };

  public getStartTime = (): number => {
    return this.startTime;
  };

  public getEndTime = (): number => {
    return this.endTime;
  };

  public getBandId = (): string => {
    return this.bandId;
  };

  static toShowModel(show: any): Show {
    return new Show(
      show.week_day,
      show.start_time,
      show.end_time,
      show.band_id
    );
  }
}
