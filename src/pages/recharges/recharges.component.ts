import { Component } from '@angular/core';

@Component({
    selector: 'app-recharges',
    templateUrl: './recharges.component.html',
    styleUrls: ['./recharges.component.scss']
})
export class RechargesComponent {
    money: number;
    a: string;
    constructor(
    ) {
        console.log(this.a);
    }

    rechargeBuy() {
        if (!this.money || this.money <= 0) {
            alert('充值必须大于0');
        } else {
            alert('支付宝充值待开发中');
        }
    }
}
