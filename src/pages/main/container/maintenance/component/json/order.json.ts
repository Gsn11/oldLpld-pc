
import buildData from '../../../../../../environments/buildType';
// { label: '待付款', state: 7, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
// { label: '待服务', state: 3, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
// { label: '待接单', state: 0, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
const MarketList = [
	// { label: '待接单', state: 0, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	{ label: '待审核', state: 0, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	{ label: '待确认', state: 1, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	// { label: '待服务', state: 3, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	{ label: '执行中', state: 2, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	{ label: '已完成', state: 3, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	{ label: '异常终止', state: 4, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	// { label: '待付款', state: 7, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	{ label: '状态异常', state: 5, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 }
];

const InsideList = [
	// { label: '待接单', state: 0, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	{ label: '待审核', state: 0, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	{ label: '待确认', state: 1, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	// { label: '待服务', state: 3, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	{ label: '执行中', state: 2, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	{ label: '已完成', state: 3, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	{ label: '异常终止', state: 4, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	// { label: '待付款', state: 7, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 },
	{ label: '状态异常', state: 5, list: null, paginatorTotal: null, PageIndex: 1, PageSize: 10 }
];

const ServiceType = [
	{ name: buildData.serviceProvider, state: '0' },
	{ name: '固定服务商', state: '1' },
	{ name: '服务大市场', state: '2' },
	{ name: '抢单式内部运维', state: '3' },
];

const ServiceTypeNow = [
	{ name: buildData.serviceProvider, value: '0' },
	{ name: '服务大市场', value: '2' },
	{ name: '抢单式内部运维', value: '3' },
];

const ServiceInside = [
	{ name: buildData.serviceProvider, value: '0' },
	{ name: '抢单式内部运维', value: '3' },
];

export { MarketList, InsideList, ServiceType, ServiceTypeNow, ServiceInside };
