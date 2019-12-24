import { Component, OnInit } from '@angular/core';
import {ContentServiceService} from './content-service.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [ContentServiceService]
})
export class ContentComponent implements OnInit {

  constructor(private srv: ContentServiceService) { }

  ngOnInit() {
  }

}
