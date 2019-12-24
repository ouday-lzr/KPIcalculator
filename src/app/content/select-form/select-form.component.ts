import { Component, OnInit, ElementRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ContentServiceService} from '../content-service.service';
import {serialize} from '@angular/compiler/src/i18n/serializers/xml_helper';

@Component({
  selector: 'app-select-form',
  templateUrl: './select-form.component.html',
  styleUrls: ['./select-form.component.scss']
})
export class SelectFormComponent implements OnInit {

  fileNameCsv = 'test';
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: [],
    showTitle: false,
    title: 'datatocsv',
    useBom: false,
    removeNewLines: true,
    keys: []
  };
  data = [];


  networkList = [];
  port = 8021; // default telecel huawei 2g
  listKpi2G = ['TCHM', 'TCHAV', 'SDCCHAV',
    'SDCCHDR', 'SDCCHCR', 'CSSR', 'TCHCR', 'TCHDR', 'CDR', 'CSR', 'HOSUCCESS'];
  listKpi3G = ['VOICETRF', 'CSRRCCSSR', 'CSRABSSR', 'CSVCSSR', 'CSVCDR', 'CS32INTERRATHOSR', 'SOFTHOSR',
  'VIDEOTRF', 'HSDPATRF', 'HSDPADEBIT', 'PSRRCCSSR', 'PSRABSSR', 'CSDCSSR', 'PSCSSR', 'CSDCDR', 'PSCDR', 'PS32INTERRATHOSR'];
  listKpi4G = ['SRRRCSSR', 'SGRRCSSR', 'ALLERABSSR', 'ALLCSSR', 'ALLCDR', 'ALLCSTR', 'INTERRATHOSR4G2G', 'INTERRATHOSR4G3G', 'INTERRATHOSR', 'INTRAFREQHOOUTSR', 'INTERFREQHOOUTSR'];
  listKpi = [];

  heure24: string[] = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

  dateD = '';
  dateF = '';
  h = '';

  constructor(private httpReq: HttpClient,
              private srv: ContentServiceService) { }

  ngOnInit() {
    // url : http://192.168.3.50:8020/OperateursNotNull
    this.httpReq.get('http://192.168.160.12:8095/api/dbGeneral/OperateursNotNull').subscribe((data: {nomOperateur: string}[]) => {
        for (const el of data) {
          this.networkList.push({name: el.nomOperateur, value: el.nomOperateur});
        }
    },
      err => {
      this.networkList = [];
      });
    this.srv.tabHeaderEvent.subscribe((data: any[]) => {
      this.options.headers = data;
      this.options.keys = data;
    });
    this.srv.tabBodyEvent.subscribe((d: any[]) => {
      console.log(d);
      this.data = d;
    });
  }


  onChangeNetwork(name: any) {
    name = name.toLowerCase();
    this.fileNameCsv = name;
    // console.log(name.toLowerCase());
    if (name.indexOf('2g') !== -1) {
      this.listKpi = this.listKpi2G;
    } else if (name.indexOf('3g') !== -1) {
      this.listKpi = this.listKpi3G;
    } else if (name.indexOf('4g') !== -1) {
      this.listKpi = this.listKpi4G;
    }

    switch (name) {
      case 'telecel_huawei_2g': this.port = 8021
        break;
      case 'telecel_huawei_3g' : this.port = 8022;
        break;
      case 'malitel_huawei_2g' : this.port = 8031;
        break;
      case 'malitel_huawei_3g': this.port = 8032;
        break;
      case 'malitel_huawei_4g' : this.port = 8033;
        break;
      case 'malitel_nsn_2g' : this.port = 8034;
        break;
      case 'malitel_nsn_3g': this.port = 8035;
        break;
      case 'malitel_nsn_4g' : this.port = 8036;
        break;
      case 'malitel_alcatel_2g' : this.port = 8037;
        break;
      case 'orange_huawei_2g': this.port = 8041;
        break;
      case 'orange_huawei_3g' : this.port = 8042;
        break;
      case 'orange_huawei_4g' : this.port = 8043;
        break;
      case 'orange_nsn_2g': this.port = 8044;
      break;
      case 'orange_nsn_3g' : this.port = 8045;
        break;
      case 'orange_nsn_4g' : this.port = 8046;
        break;
      case 'orange_alcatel_2g': this.port = 8047;
        break;
      case 'orange_alcatel_3g' : this.port = 8048;
        break;
      default: this.port = 8021;
      break;
    }

    this.srv.networkNameChange.emit({opName: name, port : this.port});
    // console.log(name);
  }

  onChangeKPI(kpi: string) {
    this.srv.selectKpi.emit(kpi);
  }

  onDateDebutChange(data) {
    this.dateD = data;
    console.log(data);
  }
  onDateFinChange(data) {
    this.dateF = data;
    console.log(data);
  }
  onHeureChange(data) {
    this.h = data;
    console.log(data);
  }
  onSendData() {
    this.srv.sumbitEvent.emit({datedebut:  this.dateD, datefin : this.dateF, heure : this.h, port : this.fileNameCsv});
  }

}
