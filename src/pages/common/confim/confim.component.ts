import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-confim',
    templateUrl: './confim.component.html',
    styleUrls: ['./confim.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfimComponent {
    @Input() confim: boolean;
    @Input() title?: string;
    @Output() setConfimResult = new EventEmitter<boolean>();
    constructor() {}

    closeConfimBox() {
        this.setConfimResult.emit(false);
    }

    okCallBack() {
        this.setConfimResult.emit(true);
    }
}
