// YYYY-MM-DD
export class SplitDate {
    date: Date;
    constructor(_DATA: Date) {
        this.date = _DATA;
    }

    translate(): string {
        const chooseDate = new Date(this.date);
        const day =  chooseDate.getDate().toString().padStart(2, '0');
        const month = (chooseDate.getMonth() + 1).toString().padStart(2, '0');
        const year = chooseDate.getFullYear();
        return `${year}-${month}-${day}`;
    }
}
