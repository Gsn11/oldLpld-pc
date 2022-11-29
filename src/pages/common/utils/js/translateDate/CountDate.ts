// YYYY-MM-DD
export class CountDate {
    date: number;
    differ: number;
    constructor(_DATA: number, _DIFFER: number) {
        this.date = _DATA;
        this.differ = _DIFFER;
    }

    differTime() {
        const ONEDAY_TIME = 86400000;
        return this.date + this.differ * ONEDAY_TIME;
    }
}
