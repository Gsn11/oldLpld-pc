import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  welcomeInfo: string;
  meunState: boolean;
  @Output() meunSwitch = new EventEmitter<boolean>();
  constructor(
    private router: Router
  ) {
    this.welcomeInfo = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Name;
    this.meunState = true;
  }

  ngOnInit() {
  }

  switchMeun() {
    this.meunState = !this.meunState;
    this.meunSwitch.emit(this.meunState);
  }
  // 跳转个人中心
  gotoMyCenter() {
    // console.log('go to my center');
  }
  // 退出平台帐号
  exit() {
    // console.log('exit system');
    localStorage.removeItem('LOGINSTATES');
    localStorage.removeItem('bemUserInfo');
    this.router.navigate(['login']);
  }
}
