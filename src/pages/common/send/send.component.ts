import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-send',
    templateUrl: './send.component.html',
    styleUrls: ['./send.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SendComponent {
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
