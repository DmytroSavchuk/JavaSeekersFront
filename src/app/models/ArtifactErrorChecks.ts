import {ArtifactErrorCheck} from "./ArtifactErrorCheck";

export class ArtifactErrorChecks {
  constructor(
    public type: string,
    public name: string,
    public path: string,
    public artifactErrorChecks: ArtifactErrorCheck[]
  ) {
  }
}
