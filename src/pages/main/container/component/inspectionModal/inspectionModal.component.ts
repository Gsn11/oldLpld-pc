import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../service/service';
@Component({
  selector: 'app-inspectionmodal',
  templateUrl: './inspectionModal.component.html',
  styleUrls: ['./inspectionModal.component.scss']
})
export class InspectionModalComponent implements OnInit {
  // @Output() getList = new EventEmitter<any>();
  @Input() data: any;
  show: boolean;
  ImgList: any;
  constructor(
    private snackBar: MatSnackBar,
    private service: Service
  ) {
    this.show = false;
  }

  ngOnInit() {
    console.log(this.data);
  }
  sChelIMg(Msseq) {
    const data = {
      FromCache: false,
      MSSeq : Msseq
    };
    this.service.serviceR('ent/maintenance/8305', data, (res: any) => {
      if (res.ResultCode === 0) {
        console.log(res);
        this.ImgList = res.Result.ScheduleImages;
      }
    });
  }
}
