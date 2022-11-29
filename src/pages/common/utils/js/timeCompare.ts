// 对两个时间做比较，返回两个时间之间的间隔时间
export class TimeCompare {
    private Duration: number;
    constructor(duration: number) {
        this.Duration = duration;
    }

    compare(): string {
        let str: string;
        const d = this.Duration / 1000 / 60 / 60 / 24;
        const h = this.Duration / 1000 / 60 / 60 - (24 * Math.floor(d));
        const m = this.Duration / 1000 / 60 - (24 * 60 * Math.floor(d)) - (60 * Math.floor(h));
        const s = this.Duration / 1000 - (24 * 60 * 60 * Math.floor(d)) - (60 * 60 * Math.floor(h)) - (60 * Math.floor(m));
        str = Math.floor(d) > 0 ? Math.floor(d) + '天' : '';
        str = str + (Math.floor(h) > 0 ? Math.floor(h) + '小时' : '');
        str = str + (Math.floor(m) > 0 ? Math.floor(m) + '分钟' : '');
        str = str + Math.floor(s) + '秒';
        return str;
    }
}
