import { Component, OnInit } from '@angular/core';
import {ContentServiceService} from '../../content-service.service';
import {forEach} from '@angular/router/src/utils/collection';
import {Datatable} from '../../datatable.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss']
})
export class TableContainerComponent implements OnInit {

  headerElements: string[] = [];
  bodyElements: Datatable[] = [];
  bodyElementsCsv: any[] = [];
  compteurs: string[] = [];
  listCells: string[] = [];
  dCsv: any;
  port = 8033;
  compteursValues = [];
  widthForElements = 19;

  constructor(private srv: ContentServiceService,
              private httpReq: HttpClient) { }

  ngOnInit() {
    this.srv.compteursEvent.subscribe(data => {
      this.compteurs = [];
      this.headerElements = ['Region', 'Cellule', 'Date', 'Heure'];
      this.bodyElements = [];
      if (data != null) {
        data.forEach((el) => {
          this.headerElements.push(el);
          this.compteurs.push(el.toLowerCase());
        });
      } else {
        this.headerElements = [];
        this.bodyElements = [];
      }
      this.widthForElements = (100 / this.headerElements.length);
      console.log(this.widthForElements);
    });

    this.srv.listSelectedCells.subscribe(data => {
      this.listCells = data;
    });

    this.srv.sumbitEvent.subscribe((data: {datedebut: string, datefin: string, heure: string, port: any}) => {
      this.bodyElements = [];
      this.bodyElementsCsv = [];
      this.compteursValues = [];
      if (this.listCells.length !== 0) {
        this.listCells.forEach((el) => {
           const url: string = 'http://192.168.160.12:8095/api/' + data.port + '/getListOfRegisterBetweenIn/' +
             data.datedebut + '/' + data.datefin + '/' + data.heure + '/' + el.toString() + '/' + this.compteurs.join();
          //const url = 'http://demo3440972.mockable.io/getListOfRegisterBetweenIn';
          //console.log(url);
          this.httpReq.get(url).subscribe(
            (rep: any[]) => {
              for (let j = 0; j < rep.length; j++) {
                this.compteursValues = [];
                this.dCsv = {
                  Sector : rep[j].region,
                  Celula : rep[j].cell_name,
                  Data : rep[j].date,
                  Hora : rep[j].heure};
                for (let i = 0; i < this.compteurs.length; i++) {
                  this.compteursValues.push(rep[j][this.compteurs[i]]);
                  this.dCsv[this.compteurs[i]] = rep[j][this.compteurs[i]];
                }
                const d = new Datatable(rep[j].region,
                  rep[j].cell_name, rep[j].date, rep[j].heure, this.compteursValues);
                this.bodyElementsCsv.push(this.dCsv);
                this.bodyElements.push(d);
              }
            },
            err => {
              console.log(err);
            }
          );
      });
        this.srv.tabHeaderEvent.emit(this.headerElements);
        this.srv.tabBodyEvent.emit(this.bodyElementsCsv);
      }
    });
  }

}
