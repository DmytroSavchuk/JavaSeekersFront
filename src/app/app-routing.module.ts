import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ControlFilesComponent} from "./control-files/control-files.component";
import {WarningsComponent} from "./warnings/warnings.component";
import {SettingsComponent} from "./settings/settings.component";
import {ArtifactsComponent} from "./artifacts/artifacts.component";

const routes: Routes = [
  {
    path: 'controlFiles',
    component: ControlFilesComponent
  },
  {
    path: 'artifacts',
    component: ArtifactsComponent
  },
  {
    path: 'warnings',
    component: WarningsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [ControlFilesComponent, ArtifactsComponent, WarningsComponent, SettingsComponent]
