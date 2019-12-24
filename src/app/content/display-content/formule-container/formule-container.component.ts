import { Component, OnInit } from '@angular/core';
import {ContentServiceService} from '../../content-service.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-formule-container',
  templateUrl: './formule-container.component.html',
  styleUrls: ['./formule-container.component.scss']
})
export class FormuleContainerComponent implements OnInit {

  selectedKpi: string;
  operatorName: string = ' _ ';

  constructor(private srv: ContentServiceService,
              private httpReq: HttpClient) { }

  ngOnInit() {
    this.srv.operatorNameChange.subscribe(opName => {
      console.log(opName);
      this.operatorName = opName;
    });

    this.srv.selectKpi.subscribe(data => {
      console.log(this.operatorName);
      this.selectedKpi = '';
      // url : 'http://192.168.3.50:8020/formulekpi/' + + data.toUpperCase() + '/' + this.operatorName.split('_')[1].toUpperCase()
      // url test : http://demo3440972.mockable.io/formulekpi/name/operateur
      this.httpReq.get('http://192.168.160.12:8095/api/dbGeneral/formulekpi/' + data.toUpperCase() + '/' + this.operatorName.split('_')[1].toUpperCase() ).
      subscribe((rep: {id: any, nomkpi: string, compteurs: string[], formule: string, equipment: string}) => {
        if (rep !== null) {
            this.selectedKpi = data.toUpperCase() + ' = ' + rep.formule;
            this.srv.compteursEvent.emit(rep.compteurs);
          } else {
            this.selectedKpi = 'Aucune donnée n\'est disponible pour cette configuration!';
            this.srv.compteursEvent.emit(null);
          }
      },
        error1 => {
          this.selectedKpi = 'Erreur lors de la récupération des données!';
          console.log(error1);
        });
    });

  }

}
