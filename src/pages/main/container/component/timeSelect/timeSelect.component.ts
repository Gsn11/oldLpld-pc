import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-timeselect',
    templateUrl: './timeselect.component.html',
    styleUrls: ['./timeselect.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TimeSelectComponent implements OnInit {
    nowTime: string;
    @Input()
    set time(time: string) {
        if (time) {
            this.nowTime = time;
        } else {
            this.nowTime = '00:00:00';
        }
    }
    SelectHH: any;
    HH: number[];
    SelectMM: any;
    MM: number[];
    @Output() getTime = new EventEmitter<string>();
    constructor() {
        this.HH = [];
        this.MM = [];
        let h = 0;
        let m = 0;
        while (h < 24) {
            this.HH.push(h);
            h++;
        }
        while (m < 60) {
            this.MM.push(m);
            m++;
        }
        this.SelectHH = new FormControl();
        this.SelectMM = new FormControl();
        if (!this.nowTime) {
            this.nowTime = '00:00:00';
        }
    }

    ngOnInit() {
        if (this.nowTime !== '00:00:00') {
            this.SelectHH.setValue(parseInt(this.nowTime.substr(0, 2), null));
            this.SelectMM.setValue(parseInt(this.nowTime.substr(3, 5), null));
        }
    }

    hourChange(event: any) {
        let t = '';
        if (event.value < 10) {
            t = '0' + event.value;
        } else {
            t = event.value;
        }
        this.nowTime = t + this.nowTime.substr(2, 8);
        this.getTime.emit(this.nowTime);
    }

    minuteChange(event: any) {
        let t = '';
        if (event.value < 10) {
            t = '0' + event.value;
        } else {
            t = event.value;
        }
        this.nowTime = this.nowTime.substr(0, 3) + t + this.nowTime.substr(5, 8);
        this.getTime.emit(this.nowTime);
    }
}
