import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ControlFiles} from "../../models/ControlFiles";
import {ControlFile} from "../../models/ControlFile";

@Injectable({
  providedIn: 'root'
})
export class ControlFileService {
  private link = "http://localhost:8080/controls";
  private selectedControlFile: ControlFile = <ControlFile>{};

  constructor(private client: HttpClient) {
  }

  public getControlFiles(name = "", moduleId = <number><unknown>null, client = "") {
    return this.client.get<ControlFiles>(`${this.link}?controlNameFilter=${name}&client=${client}${moduleId == null ? "" : "&module=" + moduleId}`);
  }

  public changeControlFileSelection(controlFile: ControlFile) {
    this.selectedControlFile = controlFile;
  }

  public getControlFileSelection() {
    return this.selectedControlFile;
  }
}
