import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ControlFileService} from "../services/controlFile/control-file.service";
import {ControlFiles} from "../models/ControlFiles";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {ClientsService} from "../services/clients/clients.service";
import {ModuleService} from "../services/module/module.service";
import {Module} from "../models/Module";
import {ControlFile} from "../models/ControlFile";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-control-files',
  templateUrl: './control-files.component.html',
  styleUrls: ['./control-files.component.css']
})
export class ControlFilesComponent implements OnInit, AfterViewInit, OnDestroy {
  public controlFiles: ControlFiles = new ControlFiles([]);

  constructor(private controlFileService: ControlFileService,
              private clientService: ClientsService,
              private moduleService: ModuleService,
              private router: Router, private route: ActivatedRoute) {
    this.dtOptions = {
      searching: false,
      select: true,
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
      }],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        $('td', row).off('click');
        $('td', row).on('click', () => {
          this.controlFileService.changeControlFileSelection(<ControlFile>data);
          this.router.navigate([`../artifacts/`], {relativeTo: this.route});
        });
        return row;
      }
    };
  }

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective = <DataTableDirective>{};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  clients: string[] = [];
  modules: Module[] = [];

  clientFilter: string = "Client";
  moduleFilter: any = "Module";
  nameFilter: string = "";

  controlTabActive = true;
  artifactTabActive = false;

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

  changeActiveTab(activeTab: string) {
    this.controlTabActive = (activeTab == 'control');
    this.artifactTabActive = (activeTab != 'control');
  }
}
