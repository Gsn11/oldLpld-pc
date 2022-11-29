// 判断字符串(str)或者对象(object)是否为空
export class StrEmpty {
  constructor() {}

  isEmpty(str: any): string {
    if (str === null || str === undefined) {
      return null;
    } else {
      if (typeof str === 'object') {
        return this.isEmptyObject(str);
      } else if (typeof str === 'string') {
        if (str === '' || str === '\"\"' || str === '\'\'') {
          return null;
        }
      } else {
        return null;
      }
    }
    return JSON.stringify(str);
  }

  isEmptyObject(str: any): string {
    const arr = Reflect.ownKeys(str);
    if (arr.length === 0) {
      return null;
    } else if (JSON.stringify(str) === '{}') {
      return null;
    } else {
      return JSON.stringify(str);
    }
  }
}
