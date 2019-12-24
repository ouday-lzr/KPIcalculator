import {EventEmitter, Injectable} from '@angular/core';
import {Datatable} from './datatable.model';

@Injectable()
export class ContentServiceService {

  networkNameChange: EventEmitter<{opName: string, port: any}> = new EventEmitter<{opName: string, port: any}>();
  operatorNameChange: EventEmitter<string> = new EventEmitter<string>();

  listSelectedCells: EventEmitter<string[]> = new EventEmitter<string[]>();
  selectKpi: EventEmitter<string> = new EventEmitter<string>();
  dataTableEvent: EventEmitter<Datatable[]> = new EventEmitter<Datatable[]>();
  compteursEvent: EventEmitter<string[]> = new EventEmitter<string[]>();
  sumbitEvent: EventEmitter<{datedebut: string, datefin: string, heure: string, port: any}> = new EventEmitter<{datedebut: string, datefin: string, heure: string, port: any}>();
  tabHeaderEvent: EventEmitter<any[]> = new EventEmitter<any[]>();
  tabBodyEvent: EventEmitter<any[]> = new EventEmitter<any[]>();

  logMessages: string = '';

  constructor() { }


}
