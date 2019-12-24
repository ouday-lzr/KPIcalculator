export class Datatable {
  region: string;
  cell: string;
  date: string;
  heure: string;
  compteurs: any[];

  constructor(region: string, cell: string, date: string,
              heure: string, compteurs: any[]) {
    this.region = region;
    this.cell = cell;
    this.date = date;
    this.heure = heure;
    this.compteurs = compteurs;
  }
}
