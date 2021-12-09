import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ArtifactErrorsCheckService} from "../services/artifactErrorsCheck/artifact-errors-check.service";
import {ControlFileService} from "../services/controlFile/control-file.service";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {Module} from "../models/Module";

@Component({
  selector: 'app-warnings',
  templateUrl: './warnings.component.html',
  styleUrls: ['./warnings.component.css']
})
export class WarningsComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(public artifactErrorCheckService: ArtifactErrorsCheckService,
              public controlFileService: ControlFileService) {
    this.dtOptions = {
      searching: true,
      data: [],
      columns: [{
        title: 'Client',
        data: 'client'
      }, {
        title: 'Name',
        data: 'name'
      }, {
        title: 'Module',
        data: 'module'
      }, {
        title: 'Type',
        data: 'type'
      }, {
        title: 'Warning',
        data: 'warning'
      }]
    };
  }

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective = <DataTableDirective>{};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let artifactCheckErrors = this.artifactErrorCheckService.getSelectedArtifact();
    let selectedControlFile = this.controlFileService.getControlFileSelectionInfo();

    this.dtOptions.data = artifactCheckErrors.artifactErrorChecks.map(e => {
      return {
        client: selectedControlFile.client,
        name: artifactCheckErrors.path,
        module: artifactCheckErrors.module,
        type: artifactCheckErrors.type,
        warning: e.actualResultMessage
      }
    });

    this.dtTrigger.next(null);
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
