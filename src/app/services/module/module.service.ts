import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ModuleResponse} from "../../models/ModuleResponse";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private link = "http://localhost:8080/modules";

  constructor(private client: HttpClient) {
  }

  public getModules() {
    return this.client.get<ModuleResponse>(this.link);
  }
}
