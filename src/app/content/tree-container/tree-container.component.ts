import {Component, OnInit} from '@angular/core';
import {TreeviewItem, TreeviewConfig} from 'ngx-treeview';
import {HttpClient} from '@angular/common/http';
import {ContentServiceService} from '../content-service.service';

@Component({
  selector: 'app-tree-container',
  templateUrl: './tree-container.component.html',
  styleUrls: ['./tree-container.component.scss']
})
export class TreeContainerComponent implements OnInit {

  config1 = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 400
  });

  itCategory: TreeviewItem[] = [new TreeviewItem({
    text: 'Global', value: 1, checked: false, children: [
      {text : 'Region1', value: 11, collapsed : true, children : [
          {text : 'Cell1', value: 111, checked: false},
          {text : 'Cell2', value : 112, checked: false},
          {text: 'Cell3', value: 113, checked: false}
        ]
      },
      {text : 'Region2', value: 12, collapsed : true, children : [
          {text : 'Cell1', value: 121, checked: false},
          {text : 'Cell2', value : 122, checked: false},
          {text: 'Cell3', value: 123, checked: false}
        ]
      },
      {text : 'Region3', value: 13, collapsed : true, children : [
          {text : 'Cell1', value: 131, checked: false},
          {text : 'Cell2', value : 132, checked: false},
          {text: 'Cell3', value: 133, checked: false}
        ]
      }
    ]
  })];

  treeElments: TreeviewItem[] = [];
  constructor(private httpReq: HttpClient,
              private srv: ContentServiceService) {
  }

  ngOnInit() {
    this.srv.networkNameChange.subscribe((d: {opName: string, port: any}) => {
      console.log('data coming from select: ' + d.port);
      this.treeElments = [];
      // url : http://192.168.3.50: + d.port+ /CellsWithRegions
      this.httpReq.get('http://192.168.160.12:8095/api/' + d.opName + '/CellsWithRegions').
      subscribe((data: {region: string, cellName: string}[]) => {
      let aux: string;
      let i = 0;
      const val = 111;
      let childCells: TreeviewItem[] = [];
      let childRegion: TreeviewItem[] = [];
      data.length !== 0 ? aux = data[0].region : aux = '';
      for (const el of data) {
        if (i === (data.length - 1)) {
          childCells.push(new TreeviewItem({text : el.cellName, value: el.cellName, checked: false}));
        }
        if (el.region !== aux || (i === (data.length - 1))) {
          childRegion.push(new TreeviewItem({
            text: aux, value: aux,
            collapsed: true, children: childCells
          }));
          aux = el.region;
          childCells = [];
        }
        childCells.push(new TreeviewItem({text : el.cellName, value: el.cellName, checked: false}));
        i++;
      }
        this.treeElments.push(new TreeviewItem(new TreeviewItem({
          text: 'Global',
          value : 0,
          checked: false,
          children : childRegion
        })));
        childRegion = [];
    },
        err => {
          this.treeElments = [];
        });
      this.srv.operatorNameChange.emit(d.opName);
    });
  }

  onSelectChange(data: any) {
    console.log(data);
    this.srv.listSelectedCells.emit(data);
  }


}
