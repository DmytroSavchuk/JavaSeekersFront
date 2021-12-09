import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {ControlFileService} from "../services/controlFile/control-file.service";
import {ClientsService} from "../services/clients/clients.service";
import {ModuleService} from "../services/module/module.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Module} from "../models/Module";
import {ArtifactTypeService} from "../services/artifactType/artifact-type.service";
import {ArtifactErrorsCheckService} from "../services/artifactErrorsCheck/artifact-errors-check.service";
import {ArtifactErrorChecksResponse} from "../models/ArtifactErrorChecksResponse";

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.css']
})
export class ArtifactsComponent implements OnInit, AfterViewInit, OnDestroy {
  public artifactErrorChecks: ArtifactErrorChecksResponse = <ArtifactErrorChecksResponse>{};

  constructor(private artifactErrorCheckService: ArtifactErrorsCheckService,
              public controlFileService: ControlFileService,
              private clientService: ClientsService,
              private moduleService: ModuleService,
              private artifactTypeService: ArtifactTypeService,
              private router: Router, private route: ActivatedRoute) {
    this.dtOptions = {
      searching: true,
      data: [],
      columns: [{
        title: 'Name',
        data: 'name'
      }, {
        title: 'Module',
        data: 'module'
      }, {
        title: 'Type',
        data: 'type'
      }, {
        title: 'Errors Count',
        data: 'errorsCount'
      }]
    };
  }

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective = <DataTableDirective>{};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  types: string[] = [];
  modules: Module[] = [];

  moduleFilter: any = "Module";
  nameFilter: string = "";


  ngOnInit(): void {
    this.artifactTypeService.getArtifactTypes().subscribe((artifactTypesResponse) => {
      this.types = artifactTypesResponse.artifactTypes;
    })
    this.moduleService.getModules().subscribe((modulesResponse) => {
      this.modules = modulesResponse.modules;
    })
  }

  ngAfterViewInit(): void {
    this.artifactErrorCheckService.getArtifactErrorChecks(this.controlFileService.getControlFileSelection()).subscribe(errorChecks => {
      let moduleId = errorChecks.module;

      this.dtOptions.data = errorChecks.artifactErrorChecks.map(e => {
        return {
          name: e.name,
          module: moduleId,
          type: e.type,
          errorsCount: e.artifactErrorChecks.length
        }
      });

      this.dtTrigger.next(null);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
}
