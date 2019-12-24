import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {Angular2CsvModule} from 'angular2-csv';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TreeviewModule } from 'ngx-treeview';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { TreeContainerComponent } from './content/tree-container/tree-container.component';
import { SelectFormComponent } from './content/select-form/select-form.component';
import { DisplayContentComponent } from './content/display-content/display-content.component';
import { FormuleContainerComponent } from './content/display-content/formule-container/formule-container.component';
import { TableContainerComponent } from './content/display-content/table-container/table-container.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    TreeContainerComponent,
    SelectFormComponent,
    DisplayContentComponent,
    FormuleContainerComponent,
    TableContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    TreeviewModule.forRoot(),
    Angular2CsvModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
