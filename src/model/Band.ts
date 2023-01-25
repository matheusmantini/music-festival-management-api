export class Band {
  constructor(
    private name: string,
    private musicGenre: string,
    private responsible: string
  ) {}

  public getName = (): string => {
    return this.name;
  };

  public getMusicGenre = (): string => {
    return this.musicGenre;
  };

  public getReponsible = (): string => {
    return this.responsible;
  };

  static toBandModel(band: any): Band {
    return new Band(band.name, band.musicGenre, band.responsible);
  }
}
