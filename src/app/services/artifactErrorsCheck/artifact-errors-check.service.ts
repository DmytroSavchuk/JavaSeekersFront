import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArtifactErrorChecksResponse} from "../../models/ArtifactErrorChecksResponse";
import {ControlFile} from "../../models/ControlFile";

@Injectable({
  providedIn: 'root'
})
export class ArtifactErrorsCheckService {
  private link = "http://localhost:8080/artifacts/errors";

  constructor(private client: HttpClient) {
  }

  public getArtifactErrorChecks(controlFile: ControlFile) {
    return this.client.get<ArtifactErrorChecksResponse>(`${this.link}?controlPath=${controlFile.client}/${controlFile.moduleId}/${controlFile.name.split("/").pop()}`);
  }
}
