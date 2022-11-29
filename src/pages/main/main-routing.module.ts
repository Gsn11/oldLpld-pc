import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import buildData from '../../environments/buildType';

const MainRoutes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{ path: 'home', loadChildren: './container/home/home.module#HomeModule' },
			{ path: 'inspection', loadChildren: './container/inspection/inspection.module#InspectionModule' },

			{ path: 'rolemgmt', loadChildren: './container/usermgmt/rolemgmt/rolemgmt.module#RolemgmtModule' },
			{ path: 'usermgmt', loadChildren: './container/usermgmt/usermgmt/usermgmt.module#UsermgmtModule' },
			{ path: 'buildingauth', loadChildren: './container/usermgmt/buildingauth/buildingauth.module#BuildingauthModule' },
			{ path: 'cusfinance', loadChildren: './container/usermgmt/cusfinance/cusfinance.module#CusfinanceModule' },
			{ path: 'subjection', loadChildren: './container/usermgmt/subjection/subjection.module#SubjectionModule' },
			{ path: 'msgmgmt', loadChildren: './container/usermgmt/msgmgmt/msgmgmt.module#MsgmgmtModule' },

			{ path: 'facturer', loadChildren: './container/paramsetup/facturer/facturer.module#FacturerModule' },
			{ path: 'brand', loadChildren: './container/paramsetup/brand/brand.module#BrandModule' },
			{ path: 'busidomain', loadChildren: './container/paramsetup/busidomain/busidomain.module#BusidomainModule' },
			{ path: 'buildusage', loadChildren: './container/paramsetup/buildusage/buildusage.module#BuildusageModule' },
			{ path: 'devtype', loadChildren: './container/paramsetup/devtype/devtype.module#DevtypeModule' },
			{ path: 'devmod', loadChildren: './container/paramsetup/devmod/devmod.module#DevmodModule' },
			{ path: 'stockwarn', loadChildren: './container/paramsetup/stockwarn/stockwarn.module#StockwarnModule' },

			{ path: 'devalertlevel', loadChildren: './container/paramsetup/devalertlevel/devalertlevel.module#DevalertlevelModule' },
			{ path: 'cusofferitem', loadChildren: './container/paramsetup/cusofferitem/cusofferitem.module#CusofferitemModule' },
			{ path: 'agreement', loadChildren: './container/paramsetup/agreement/agreement.module#AgreementModule' },
			{ path: 'customerteam', loadChildren: './container/paramsetup/customerteam/customerteam.module#CustomerteamModule' },
			{ path: 'cusmenu', loadChildren: './container/paramsetup/cusmenu/cusmenu.module#CusmenuModule' },
			{ path: 'setupschedule', loadChildren: './container/paramsetup/setupschedule/setupschedule.module#SetupscheduleModule' },
			{ path: 'customerjob', loadChildren: './container/paramsetup/customerjob/customerjob.module#CustomerjobModule' },
			{ path: 'subsys', loadChildren: './container/paramsetup/subsys/subsys.module#SubsysModule' },
			{ path: 'subsysdoc', loadChildren: './container/paramsetup/subsysdoc/subsysdoc.module#SubsysdocModule' },

			{ path: 'gatewaydev', loadChildren: './container/devicemgmt/dev/dev.module#DevModule', data: { type: 'gatewaydev' } },
			{
				path: 'metricvar',
				loadChildren: './container/iotmgmt/gatewaysetup/metricvar/metricvar.module#MetricvarModule'
			},
			{
				path: 'gatewayrtinfo',
				loadChildren: './container/iotmgmt/gatewaysetup/gatewayrtinfo/gatewayrtinfo.module#GatewayrtinfoModule'
			},
			{
				path: 'gatewayprotocol',
				loadChildren: './container/iotmgmt/gatewaysetup/gatewayprotocol/gatewayprotocol.module#GatewayprotocolModule'
			},
			{ path: 'devmetric', loadChildren: './container/iotmgmt/gatewaysetup/devmetric/devmetric.module#DevmetricModule' },
			{ path: 'devcheckip', loadChildren: './container/iotmgmt/gatewaysetup/devcheckip/devcheckip.module#DevcheckipModule' },

			{
				path: 'buildinggroup',
				loadChildren: './container/buildingfacilitiesmgmt/buildinggroup/buildinggroup.module#BuildinggroupModule'
			},
			{ path: 'building', loadChildren: './container/buildingfacilitiesmgmt/building/building.module#BuildingModule' },
			{ path: 'facilities', loadChildren: './container/buildingfacilitiesmgmt/facilities/facilities.module#FacilitiesModule' },
			{
				path: 'buildingspace',
				loadChildren: './container/buildingfacilitiesmgmt/buildingspace/buildingspace.module#BuildingspaceModule'
			},

			{ path: 'devicealarm', loadChildren: './container/devicemgmt/alarmdevmgmt/alarmdevmgmt.module#AlarmdevmgmtModule' },
			{ path: 'smartdev', loadChildren: './container/devicemgmt/dev/dev.module#DevModule', data: { type: 'smartdev' } },
			{ path: 'commdev', loadChildren: './container/devicemgmt/dev/dev.module#DevModule', data: { type: 'commdev' } },
			{ path: 'secdev', loadChildren: './container/devicemgmt/dev/dev.module#DevModule', data: { type: 'secdev' } },
			{ path: 'devpartsmgmt', loadChildren: './container/devicemgmt/dev/dev.module#DevModule', data: { type: 'devpartsmgmt' } },
			{ path: 'sparepartsmgmt', loadChildren: './container/devicemgmt/dev/dev.module#DevModule', data: { type: 'sparepartsmgmt' } },
			{ path: 'backup', loadChildren: './container/maintenance/backup/backup.module#BackupModule' },
			{ path: 'diagdevrt', loadChildren: './container/maintenance/diagdevrt/diagdevrt.module#DiagdevrtModule' },
			{ path: 'srvprovider', loadChildren: './container/maintenance/srvprovider/srvprovider.module#SrvproviderModule' },
			{
				path: 'patrolpostemplate',
				loadChildren: './container/maintenance/mtnschedule/patrolpostemplate/patrolpostemplate.module#PatrolpostemplateModule'
			},
			{
				path: 'schedulepatrol',
				loadChildren: './container/maintenance/mtnschedule/schedule/schedule.module#ScheduleModule',
				data: { type: 'schedulepatrol' }
			},
			{
				path: 'inspectionschedule',
				loadChildren: './container/maintenance/mtnschedule/schedule/schedule.module#ScheduleModule',
				data: { type: 'inspectionschedule' }
			},
			{
				path: 'schedulekeep',
				loadChildren: './container/maintenance/mtnschedule/schedule/schedule.module#ScheduleModule',
				data: { type: 'schedulekeep' }
			},
			{
				path: 'schedulefix',
				loadChildren: './container/maintenance/mtnschedule/schedule/schedule.module#ScheduleModule',
				data: { type: 'schedulefix' }
			},

			{
				path: 'orderfix',
				loadChildren: './container/maintenance/ordermgmt/order/order.module#OrderModule',
				data: { type: 'orderfix' }
			},
			{
				path: 'orderschedulechk',
				loadChildren: './container/maintenance/ordermgmt/order/order.module#OrderModule',
				data: { type: 'orderschedulechk' }
			},
			{
				path: 'orderkeep',
				loadChildren: './container/maintenance/ordermgmt/order/order.module#OrderModule',
				data: { type: 'orderkeep' }
			},
			{ path: 'orderqraudit', loadChildren: './container/maintenance/ordermgmt/orderqraudit/orderqraudit.module#OrderqrauditModule' },

			{ path: 'diagalert', loadChildren: './container/maintenance/faultmgmt/diagalert/diagalert.module#DiagalertModule' },
			{ path: 'diagassit', loadChildren: './container/maintenance/faultmgmt/diagassit/diagassit.module#DiagassitModule' },
			{ path: 'strategyalert', loadChildren: './container/maintenance/faultmgmt/strategyalert/strategyalert.module#Strategyalert' },
			{ path: 'hisalert', loadChildren: './container/maintenance/faultmgmt/history/materielDetail.module#MaterielDetailModule' },

			{ path: 'userinfo', loadChildren: './container/userinfo/userinfo.module#UserinfoModule' },

			{ path: 'workbench', loadChildren: './container/workbench/workbench.module#Workbench' },

			// 报表开始
			{ path: 'orderStaticReport', loadChildren: './container/report/orderStaticReport/orderStaticReport.module#OrderStaticReport' },
			{ path: 'reportFormula', loadChildren: './container/report/reportFormula/reportFormula.module#ReportFormulaModule' },
			// tslint:disable-next-line:max-line-length
			{ path: 'operationsReport', loadChildren: './container/report/operationsReport/operationsReport.module#OperationsReportModule' },

			{ path: 'devServabilityReport', loadChildren: './container/report/devServabilityReport/devServabilityReport.module#DevServabilityReportModule' },

			{ path: 'devExamineReport', loadChildren: './container/report/devExamineReport/devExamineReport.module#DevExamineReportModule' },

			{ path: 'scheduleDateReport', loadChildren: './container/report/scheduleDateReport/scheduleDateReport.module#ScheduleDateReportModule' },
			{ path: 'scheduleDateHisReport', loadChildren: './container/report/scheduleDateHisReport/scheduleDateReport.module#ScheduleDateReportModule' },
			{ path: 'cleanwater1', loadChildren: './container/report/cleanwater1/cleanwater.module#CleanwaterModule' },
			{ path: 'cleanwaterHis1', loadChildren: './container/report/cleanwaterHis1/cleanwater.module#CleanwaterModule' },
			
			{ path: 'cleanwater2', loadChildren: './container/report/cleanwater2/cleanwater.module#CleanwaterModule' },
			{ path: 'cleanwaterHis2', loadChildren: './container/report/cleanwaterHis2/cleanwater.module#CleanwaterModule' },

			{ path: 'secpump1', loadChildren: './container/report/secpump1/secpump.module#SecpumpModule' },
			{ path: 'secpumpHis1', loadChildren: './container/report/secpumpHis1/secpump.module#SecpumpModule' },

			{ path: 'secpump2', loadChildren: './container/report/secpump2/secpump.module#SecpumpModule' },
			{ path: 'secpumpHis2', loadChildren: './container/report/secpumpHis2/secpump.module#SecpumpModule' },
			// 报表结束

			// tslint:disable-next-line:max-line-length
			{ path: 'schedulingShift', loadChildren: './container/scheduling/schedulingShift/schedulingShift.module#SchedulingShiftModule' },

			{ path: 'schedule', loadChildren: './container/scheduling/schedule/schedule.module#ScheduleModule' },
			{ path: 'scheduleonduty', loadChildren: './container/scheduling/scheduleonduty/schedule.module#ScheduleModule' },

			{ path: 'schedulingRule', loadChildren: './container/scheduling/schedulingRule/schedulingRule.module#SchedulingRuleModule' },
			{ path: 'schedulestatic', loadChildren: './container/scheduling/schedulestatic/schedulestatic.module#SchedulestaticModule' },
      { path: 'holidaysetup', loadChildren: './container/scheduling/holidaysetup/holidaysetup.module#HolidaysetupModule' },
			{ path: 'orderlist', loadChildren: './container/maintenance/ordermgmt/repairBrowse/repairBrowse.module#RepairBrowseModule' },

			{
				path: 'realTimeDetail',
				loadChildren: './container/maintenance/ordermgmt/realTimeDetail/realTimeDetail.module#RealTimeDetailModule'
			},

			{
				path: 'thirdPartyUrl',
				loadChildren: './container/thirdPartyUrl/thirdPartyUrl.module#ThirdPartyUrlModule'
			},

			// 物料管理
			// {
			// 	path: 'materiel',
			// 	loadChildren: './container/materiel/materiel.module#MaterielModule'
			// },
			{
				path: 'material',
				loadChildren: './container/materiellpld/materiel.module#MaterielModule',
				data: { type: 'material' }
			},
			{
				path: 'bayimaterial',
				loadChildren: './container/materiellpld/materiel.module#MaterielModule',
				data: { type: 'bayi' }
			},
			{
				path: 'guoximaterial',
				loadChildren: './container/materiellpld/materiel.module#MaterielModule',
				data: { type: 'guoxi' }
			},
			{
				path: 'dengyunmaterial',
				loadChildren: './container/materiellpld/materiel.module#MaterielModule',
				data: { type: 'dengyun' }
			},
			{
				path: 'bindematerial',
				loadChildren: './container/materiellpld/materiel.module#MaterielModule',
				data: { type: 'binde' }
			},
			{
				path: 'kuiqimaterial',
				loadChildren: './container/materiellpld/materiel.module#MaterielModule',
				data: { type: 'kuiqi' }
			},
			{
				path: 'hongxingmaterial',
				loadChildren: './container/materiellpld/materiel.module#MaterielModule',
				data: { type: 'hongxing' }
			},
			{
				path: 'dongfengmaterial',
				loadChildren: './container/materiellpld/materiel.module#MaterielModule',
				data: { type: 'dongfeng' }
			},


			{
				path: 'materielalarm',
				loadChildren: './container/materielalarm/materielalarm.module#MaterielalarmModule'
			},
			// {
			// 	path: 'stocklog',
			// 	loadChildren: './container/materielalarmlpld/materielalarm.module#MaterielalarmModule',
			// 	data: { type: 'bayi' }
			// },
			{
				path: 'bayistocklog',
				loadChildren: './container/materielalarmlpld/materielalarm.module#MaterielalarmModule',
				data: { type: 'bayi' }
			},
			{
				path: 'guoxistocklog',
				loadChildren: './container/materielalarmlpld/materielalarm.module#MaterielalarmModule',
				data: { type: 'guoxi' }
			},
			{
				path: 'dengyunstocklog',
				loadChildren: './container/materielalarmlpld/materielalarm.module#MaterielalarmModule',
				data: { type: 'dengyun' }
			},
			{
				path: 'bindestocklog',
				loadChildren: './container/materielalarmlpld/materielalarm.module#MaterielalarmModule',
				data: { type: 'binde' }
			},
			{
				path: 'kuiqistocklog',
				loadChildren: './container/materielalarmlpld/materielalarm.module#MaterielalarmModule',
				data: { type: 'kuiqi' }
			},
			{
				path: 'hongxingstocklog',
				loadChildren: './container/materielalarmlpld/materielalarm.module#MaterielalarmModule',
				data: { type: 'hongxing' }
			},
			{
				path: 'dongfengstocklog',
				loadChildren: './container/materielalarmlpld/materielalarm.module#MaterielalarmModule',
				data: { type: 'dongfeng' }
			},


			{
				path: 'bayistockdetail',
				loadChildren: './container/materielDetaillpld/materielDetail.module#MaterielDetailModule',
				data: { type: 'bayi' }
			},
			{
				path: 'guoxistockdetail',
				loadChildren: './container/materielDetaillpld/materielDetail.module#MaterielDetailModule',
				data: { type: 'guoxi' }
			},
			{
				path: 'materialstock', // 统一出入库明细
				loadChildren: './container/materialstock/materielDetail.module#MaterielDetailModule'
			},
			// 物料管理结束
			{
				path: 'strategy',
				loadChildren: './container/strategy/strategy/strategy.module#Strategy'
			},
			{
				path: 'strategyaiot',
				loadChildren: './container/strategy/strategyaiot/strategyaiot.module#Strategyaiot'
			},
			{
				path: 'strategygroup',
				loadChildren: './container/strategy/strategygroup/strategygroup.module#Strategygroup'
			},
			{
				path: 'agentordernew',
				loadChildren: './container/agentorder/agentordernew/agentordernew.module#AgentordernewModule'
			},
			{
				path: 'agentorderdecision',
				loadChildren: './container/agentorder/agentorderdecision/agentorderdecision.module#AgentorderdecisionModule'
			},
			{
				path: 'agentorderopinion',
				loadChildren: './container/agentorder/agentorderopinion/agentorderopinion.module#AgentorderopinionModule'
			},
			{
				path: 'agentordercommander',
				loadChildren: './container/agentorder/agentordercommander/agentordercommander.module#AgentordercommanderModule'
			},
			// 报警管理
			{
				path: 'alertsmstemplate',
				loadChildren: './container/alarmManagement/materialstock/materielDetail.module#MaterielDetailModule'
			},
			{
				path: 'alertsms',
				loadChildren: './container/maintenance/faultmgmt/diagassit/diagassit.module#DiagassitModule',
				data: { type: 'alertsms' }
			},
			{
				path: 'alertsmshis',
				loadChildren: './container/alarmManagement/history/materielDetail.module#MaterielDetailModule'
			}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(MainRoutes)],
	exports: [RouterModule]
})
export class MainRoutingModule { }
