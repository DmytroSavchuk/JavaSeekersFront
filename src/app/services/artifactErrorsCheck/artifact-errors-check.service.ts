import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArtifactErrorChecksResponse} from "../../models/ArtifactErrorChecksResponse";
import {ArtifactErrorsUi} from "../../models/ArtifactErrorsUi";

@Injectable({
  providedIn: 'root'
})
export class ArtifactErrorsCheckService {
  private link = "http://localhost:8080/artifacts/errors";

  constructor(private client: HttpClient) {
  }

  public getArtifactErrorChecks(controlFile: string) {
    return this.client.get<ArtifactErrorChecksResponse>(`${this.link}?controlPath=${controlFile}`);
  }

  public changeSelectedArtifact(artifactErrorChecks: ArtifactErrorsUi) {
    localStorage.setItem("selectedArtifact", JSON.stringify(artifactErrorChecks));
  }

  public getSelectedArtifact(): ArtifactErrorsUi {
    return JSON.parse(<string>localStorage.getItem("selectedArtifact"));
  }
}
