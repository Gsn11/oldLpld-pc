import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss'],
    animations: [
        trigger('firstSwitch', [
            state('open', style({
                padding: '0 0 10px 20px',
                maxHeight: '1600px',
                opacity: 1,
            })),
            state('closed', style({
                padding: '0 0 0 20px',
                maxHeight: '0px',
                opacity: 0,
            })),
            transition('open => closed', [
                animate('0s')
            ]),
            transition('closed => open', [
                animate('0.24s')
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TreeComponent {
    @Output() setTreeChange = new EventEmitter<any>();
    @Input() List: any;
    @Input() allSwitchIsOpen: boolean;
    @Input() showSeq: boolean;
    constructor() {
    }
    /**
     * 项目点击事件
     * @param Index 下标
     */
    toggle(Index: number) {
        // if (this.List[Index].switch === undefined || this.List[Index].switch === null) {
        //     return;
        // }
        this.setTreeChange.emit(this.List[Index]);
        if (this.List[Index].children) {
            this.List[Index].switch = !this.List[Index].switch;
            this.List[Index].isChoose = !this.List[Index].isChoose;
            // this.List[Index].display = !this.List[Index].display;
        }
    }

    treeChange(tree: any) {
        this.setTreeChange.emit(tree);
    }
}
