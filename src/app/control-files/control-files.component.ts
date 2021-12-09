import {Component, OnInit, ViewChild} from '@angular/core';
import {ControlFileService} from "../services/controlFile/control-file.service";
import {ControlFiles} from "../models/ControlFiles";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {ClientsService} from "../services/clients/clients.service";
import {ModuleService} from "../services/module/module.service";
import {Module} from "../models/Module";

@Component({
  selector: 'app-control-files',
  templateUrl: './control-files.component.html',
  styleUrls: ['./control-files.component.css']
})
export class ControlFilesComponent implements OnInit {
  public controlFiles: ControlFiles = new ControlFiles([]);

  constructor(private controlFileService: ControlFileService, private clientService: ClientsService, private moduleService: ModuleService) {
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
  modules: Module[] = [];

  clientFilter: string = "Client";
  moduleFilter: any = "Module";
  nameFilter: string = "";

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clientsResponse) => {
      this.clients = clientsResponse.clients;
    })
    this.moduleService.getModules().subscribe((modulesResponse) => {
      this.modules = modulesResponse.modules;
    })
  }

  ngAfterViewInit(): void {
    this.controlFileService.getControlFiles().subscribe(controlFiles => {
      this.dtOptions.data = controlFiles.controlFiles;
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

  getFilteredControlFiles() {
    let module = this.moduleFilter == "Module" ? "" : this.moduleFilter;
    let client = this.clientFilter == "Client" ? "" : this.clientFilter;

    this.controlFileService.getControlFiles(this.nameFilter, module, client).subscribe(controlFiles => {
      this.dtOptions.data = controlFiles.controlFiles;
      this.rerender();
    });
  }
}
