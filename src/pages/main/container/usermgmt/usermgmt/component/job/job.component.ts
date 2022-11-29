import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../../service/service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  providers: [ Service ]
})
export class JobComponent implements OnInit {
  SelectJobs: any;
  SelectTeams: any;
  Teams: any;
  Jobs: any;
  @Input() userJob: any;
  constructor(
    private service: Service,
    private snackBar: MatSnackBar,
  ) {
    this.userJob = [];
    this.SelectTeams = new FormControl('');
    this.Teams = [];
    this.Jobs = [];
    this.SelectJobs = new FormControl('');
  }

  ngOnInit() {
    const data = {
      State: 0,
    };
    this.service.serviceR('ent/params/team/10101', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.Teams = res.Result.Teams;
      }
    });
    this.service.serviceR('ent/params/job/10701', data, (res: any) => {
      if (res.ResultCode === 0) {
        this.Jobs = res.Result.Jobs;
      }
    });
  }

  userJobCheck() {
    if (this.SelectTeams.value && this.SelectJobs.value) {
      const data = {
        TSeq: this.SelectTeams.value ? this.SelectTeams.value.TSeq : null,
        JSeq: this.SelectJobs.value ? this.SelectJobs.value.JSeq : null,
        USeq: null,
        TName: this.SelectTeams.value ? this.SelectTeams.value.TName : null,
        JName: this.SelectJobs.value ? this.SelectJobs.value.JName : null,
      };
      for (const u of this.userJob) {
        if (u.TSeq === data.TSeq && u.JSeq === data.JSeq) {
          this.snackBar.open('请勿重复添加！', '确认', {
            duration: 1600,
            verticalPosition: 'top',
            panelClass: 'snack-bar-color-warning'
          });
          return;
        }
      }
      this.userJob.push(data);
    }
  }

  deleteUserJobsItem(index: number) {
    this.userJob.splice(index, 1);
  }
}
