// 获取当前时间
export class GetTime {
    constructor() { }

    GetTime(): string {
        const time = new Date();
        const houers = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const seconds = time.getSeconds();
        return houers  + ':' + minutes + ':' + seconds;
    }
}
