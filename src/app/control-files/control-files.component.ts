import {Component, OnInit} from '@angular/core';
import {ControlFileService} from "../service/control-file/control-file.service";
import {ControlFile} from "../model/ControlFile";

@Component({
  selector: 'app-control-files',
  templateUrl: './control-files.component.html',
  styleUrls: ['./control-files.component.css']
})
export class ControlFilesComponent implements OnInit {
  controlFiles: ControlFile[] = [];

  constructor(private controlFileService: ControlFileService) {
  }

  ngOnInit(): void {
    this.controlFileService.getControlFiles("null", "", 0).subscribe(data => {
      this.controlFiles = data;
      console.log(this.controlFiles);
    });
  }

}
