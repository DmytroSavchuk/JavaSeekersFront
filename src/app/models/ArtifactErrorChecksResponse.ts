import {ArtifactErrorChecks} from "./ArtifactErrorChecks";

export class ArtifactErrorChecksResponse {
  constructor(
    public client: string,
    public module: number,
    public controlName: string,
    public artifactErrorChecks: ArtifactErrorChecks[]
  ) {
  }
}
