import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../../service/service';
import { ManyFileComponent } from '../../../../component/fileUpload/manyFile/manyFile.component';
@Component({
  selector: 'app-coremodal',
  templateUrl: './coreModal.component.html',
  styleUrls: ['./coreModal.component.scss']
})
export class CoreModalComponent implements OnInit {
  // @Output() getList = new EventEmitter<any>();
  @Input() data: any;
  show: boolean;
  scorenum: any;
  imgsrcData: object[] = [];
  ImgList: any;
  name: any;
  StateList: any;
  @ViewChild(ManyFileComponent, null) manyFile: ManyFileComponent;
  EvaluateInfo: any;
  constructor(
    private snackBar: MatSnackBar,
    private service: Service,
    private router: Router
  ) {
    this.show = false;
  }

  ngOnInit() {
    console.log(this.data);
    this.StateList = [
      {id: '1', src: '../../../../../../../assets/all/heart.png'},
      {id: '2', src: '../../../../../../../assets/all/heart.png'},
      {id: '3', src: '../../../../../../../assets/all/heart.png'},
      {id: '4', src: '../../../../../../../assets/all/heart.png'},
      {id: '5', src: '../../../../../../../assets/all/heart.png'}
    ];
  }
  selectPic(index) {
    console.log(index);
    this.StateList = [
      {id: '1', src: '../../../../../../../assets/all/heart.png'},
      {id: '2', src: '../../../../../../../assets/all/heart.png'},
      {id: '3', src: '../../../../../../../assets/all/heart.png'},
      {id: '4', src: '../../../../../../../assets/all/heart.png'},
      {id: '5', src: '../../../../../../../assets/all/heart.png'}
    ];
    for ( let i = 0; i < index + 1; i++) {
        this.StateList[i].src = '../../../../../../../assets/all/sheart.png';
    }
    this.scorenum = (index + 1) * 20;
  }
  ScoreSub(el: any) {
    if ( this.scorenum === undefined) {
      this.snackBar.open('请选择评分', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-success'
                });
    } else {
    const mode = {
      MOSeq: el,
      Vote: this.scorenum,
      MOVDesc: this.name,
      Pics: this.imgsrcData
    };
    // else if (this.name === undefined) {
    //   this.snackBar.open('请选择服务态度评价', '确认', {
    //     duration: 1600,
    //     verticalPosition: 'top',
    //     panelClass: 'snack-bar-color-success'
    // });
    // }
    console.log(mode);
    this.service.serviceR('ent/maintenance/8032', mode, ((res: any) => {
      console.log(res);
      if (res.ResultCode === 0) {
          this.snackBar.open('操作成功！', '确认', {
              duration: 1600,
              verticalPosition: 'top',
              panelClass: 'snack-bar-color-success'
          });
          this.show = false;
          window.location.reload();
      } else {
          this.snackBar.open('系统错误！', '确认', {
              duration: 1600,
              verticalPosition: 'top',
              panelClass: 'snack-bar-color-success'
          });
      }
  }));
}
  }
getValue() {
  console.log(this.name);
}
}
