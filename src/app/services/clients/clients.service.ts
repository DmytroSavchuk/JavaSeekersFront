import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClientResponse} from "../../models/ClientResponse";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private link = "http://localhost:8080/clients";

  constructor(private client: HttpClient) {
  }

  public getClients() {
    return this.client.get<ClientResponse>(this.link);
  }
}
