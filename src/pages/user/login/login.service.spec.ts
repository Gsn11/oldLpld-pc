import {ComponentFixture, TestBed} from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let component: LoginService;
  let fixture: ComponentFixture<LoginService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginService]
    });
    fixture = TestBed.createComponent(LoginService);
    component = fixture.componentInstance;
  });
});
