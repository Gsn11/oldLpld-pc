import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-treecheckitem',
    templateUrl: './treeCheckItem.component.html',
    styleUrls: ['./treeCheckItem.component.scss'],
    animations: [
        trigger('firstSwitch', [
            state('open', style({
                padding: '0 0 10px 30px',
                maxHeight: '3000px',
                opacity: 1,
            })),
            state('closed', style({
                padding: '0 0 0 30px',
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
    ]
})
export class TreeCheckItemComponent {
    @Input() List: any;
    @Input() isType: string;
    constructor() { }

    /**
     * 总项目点击事件
     * @param Index 下标
     */
    toggle(Index: number) {
        const childList = this.List[Index].children;
        if (this.List[Index].switch === undefined || this.List[Index].switch === null) {
            return;
        }
        if (typeof childList === 'object') {
            this.List[Index].switch = !this.List[Index].switch;
        }
    }

    checkList(event: any, Index: number, type?: string) {
        this.checkItem(this.List[Index], event.checked, type);
    }

    checkItem(list: any, check: boolean, type?: string) {
        const childList = list.children;
        if (type !== 'first') {
            list.check = check;
        }
        if (typeof childList === 'object') {
            for (const c of childList) {
                this.checkItem(c, check);
            }
        }
    }
}
