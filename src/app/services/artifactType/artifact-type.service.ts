import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArtifactTypeResponse} from "../../models/ArtifactTypeResponse";

@Injectable({
  providedIn: 'root'
})
export class ArtifactTypeService {
  private link = "http://localhost:8080/artifacts/types";

  constructor(private client: HttpClient) {
  }

  public getArtifactTypes() {
    return this.client.get<ArtifactTypeResponse>(this.link);
  }
}
