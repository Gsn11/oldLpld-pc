// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// 测试是使用，因为没有搭建本地环境，都是用测试环境进行测试
export const environment = {
  production: false,
  reportBaseUrl: 'http://www.bemcn.com.cn:8036/',
  // reportBaseUrl: 'http://168.1.7.64:8080/',
  // -- 上线项目使用 bemcloudent
  // baseUrl: 'https://www.wanlouyun.com:9443/'
  // -- 项目版测试地址使用 8922
  // baseUrl: 'http://www.bemcn.com.cn:20080/bemcloudweb/' || 'https://test.wanlouyun.com:51443/'
  // -- 项目版地址使用 8022
  // baseUrl: 'https://test.wanlouyun.com:9443/'
  // -- LPLD/水库地址
  // baseUrl: 'http://192.168.199.10:20080/bemcloudweb/'
  // 联排联调正式版
  baseUrl: 'http://192.168.199.10:20080/bemcloudweb/'
  // 联排联调测试版
  // baseUrl: 'https://water.wanlouyun.com:9443'
  // 东南水厂正式
  // baseUrl: 'http://168.1.7.63:20080/bemcloudweb/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
