import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  crumbsList: object;
  constructor(
    private router: Router,
    private service: Service,
    private snackBar: MatSnackBar,
  ) {
    this.crumbsList = [
      { name: '运维中心', open: false, url: '' },
      { name: '固定服务商', open: true, url: 'srvprovider' },
      { name: '新增', open: false, url: '' }
    ];
  }

  ngOnInit() {}
}
