import {ArtifactErrorCheck} from "./ArtifactErrorCheck";

export class ArtifactErrorsUi {
  constructor(
    public type: string,
    public name: string,
    public path: string,
    public artifactErrorChecks: ArtifactErrorCheck[],
    public module: number
  ) {
  }
}
