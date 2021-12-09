import {Component, OnInit, ViewChild} from '@angular/core';
import {ControlFileService} from "../services/controlFile/control-file.service";
import {ControlFiles} from "../models/ControlFiles";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";

@Component({
  selector: 'app-control-files',
  templateUrl: './control-files.component.html',
  styleUrls: ['./control-files.component.css']
})
export class ControlFilesComponent implements OnInit {
  public controlFiles: ControlFiles = new ControlFiles([]);

  constructor(private controlFileService: ControlFileService) {
    this.dtOptions = {
      searching: false,
      data: [],
      columns: [{
        title: 'Client',
        data: 'client'
      }, {
        title: 'Name',
        data: 'name'
      }, {
        title: 'Module',
        data: 'moduleId'
      }]
    };
  }

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective = <DataTableDirective>{};
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  clients: string[] = [];

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.controlFileService.getControlFiles("", 0, "").subscribe(controlFiles => {
      console.log(this.dtOptions.data);
      this.dtOptions.data = this.dtOptions.data?.slice(0, 1).concat(controlFiles.controlFiles);
      this.controlFiles = controlFiles;
      this.dtTrigger.next(null);
    })
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
