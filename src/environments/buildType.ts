// 打包根据项目自动加载不同的页面和js
// 联排联调、东南水厂
const buildType = '联排联调';

const buildData = {
	isProd: true, // 是否正式
	buildType,
	serviceProvider: '', // 服务提供方，默认：公司运维班组
	materielVal: { // 测试
		bayi: {
			Building: 218
		},
		guoxi: {
			Building: 219
		},
		dengyun: {
			Building: 220
		},
		binde: {
			Building: 221
		},
		kuiqi: {
			Building: 222
		},
		hongxing: {
			Building: 223
		},
		dongfeng: {
			Building: 224
		}
	}
};

if (buildData.isProd) {
	buildData.materielVal = { // 正式
		bayi: {
			Building: 166
		},
		guoxi: {
			Building: 167
		},
		dengyun: {
			Building: 168
		},
		binde: {
			Building: 175
		},
		kuiqi: {
			Building: 184
		},
		hongxing: {
			Building: 194
		},
		dongfeng: {
			Building: 195
		}
	};
}

if (buildData.buildType === '东南水厂') {
	buildData.serviceProvider = '	抢单式内部运维';
} else if (buildData.buildType === '联排联调') {
	buildData.serviceProvider = '中心运维班组';
} else {
	buildData.serviceProvider = '公司运维班组';
}

export default buildData;
