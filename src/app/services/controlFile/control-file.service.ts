import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ControlFiles} from "../../models/ControlFiles";

@Injectable({
  providedIn: 'root'
})
export class ControlFileService {
  private link = "http://localhost:8080/controls"
  private filterName = "?client=&module=&controlNameFilter="

  constructor(private client: HttpClient) {
  }

  public getControlFiles(name: string, moduleId: number, client: string) {
    return this.client.get<ControlFiles>(this.link);
  }
}
