import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ControlFile} from "../../model/ControlFile";

@Injectable({
  providedIn: 'root'
})
export class ControlFileService {
  GET_CONTROL_FILES_URL = "http://localhost:8080/controls";

  constructor(private httpClient: HttpClient) { }

  public getControlFiles(clientFilter: string, nameFilter: string, moduleFilter: number) {
    return this.httpClient.get<ControlFile[]>("");
  }
}
