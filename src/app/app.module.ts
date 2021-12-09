import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {ControlFilesComponent} from "./control-files/control-files.component";
import {ArtifactsComponent} from "./artifacts/artifacts.component";
import {WarningsComponent} from "./warnings/warnings.component";
import {SettingsComponent} from "./settings/settings.component";
import {DataTablesModule} from "angular-datatables";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        DataTablesModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent, ControlFilesComponent, ArtifactsComponent, WarningsComponent, SettingsComponent]
})
export class AppModule { }
