import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StrategyDialogComponent } from '../../../component/dialog/strategy-dialog/strategy-dialog.component';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  crumbsList: object;
  formula: any;
  list: any;
  name: any;
  columns = ['name', 'variable', 'var', 'formula', 'operate'];
  a: any;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.crumbsList = [
      { name: '运维策略管理', open: false, url: '' },
      { name: '策略管理', open: false, url: '' },
      { name: '新增策略', open: false, url: '' }
    ];
  }

  ngOnInit() {}

  select() {
    const dialogRef = this.dialog.open(StrategyDialogComponent, {
      width: '1080px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const list = [];
        res[0].forEach(item => {
          item.AlertFormula = '';
          const data = {};
          for (const i in item) {
            if (true) {
              data[i] = item[i];
            }
          }
          list.push(data);
        });
        this.list = list;
      }
    });
  }

  del(index) {
    this.list.splice(index, 1);
    const list = [];
    this.list.forEach(item => {
        list.push(item);
    });
    this.list = list;
  }

  add() {
    if (!this.name) {
      this.snackBar.open('请输入策略名称', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-danger'
      });
      return false;
    }

    if (!this.list) {
      this.snackBar.open('请选择监测点', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-danger'
      });
      return false;
    }

    if (this.list.findIndex(item => item.var === '') >= 0) {
      this.snackBar.open('请填写监测点的变量', '确认', {
          duration: 1600,
          verticalPosition: 'top',
          panelClass: 'snack-bar-color-danger'
      });
      return false;
    }

    const data = {
      Name: this.name,
      Items: [],
      Formula: this.formula
    };

    this.list.forEach(item => {
      const pushData = {
        Protocol: null,
        Item: item.Seq,
        Formula: item.AlertFormula,
        Var: item.var
      };
      switch (item.Protocol) {
        case 'Bacnet':
          pushData.Protocol = 0;
          break;
        case 'Modbus':
          pushData.Protocol = 1;
          break;
        case 'Opcda2.0':
          pushData.Protocol = 2;
          break;
        case 'Opc ua':
          pushData.Protocol = 3;
          break;
        case 'Obix':
          pushData.Protocol = 4;
          break;
        case 'Bem':
          pushData.Protocol = 5;
          break;
        case 'Mqt':
          pushData.Protocol = 6;
          break;
       }
      data.Items.push(pushData);
    });

    this.service.serviceR('ent/strategy/17002', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.snackBar.open('添加成功', '确认', {
            duration: 1600,
            verticalPosition: 'top',
            panelClass: 'snack-bar-color-info'
        });
        window.history.go(-1);
      }
    });
  }
}
