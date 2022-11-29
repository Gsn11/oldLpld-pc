import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { Service } from '../../../../../service/service';
import { DownloadFile } from '../../../../../common/utils/js/downloadfile';
import { ExcelUploadComponent } from '../../../component/excelUpload/excelUpload.component';
import { ThreeDComponent } from '../../../component/threeD/threeD.component';
import { WarehouseOutComponent } from '../../../component/warehouseOut/warehouseOut.component';
import { MatSnackBar, MatDialog, MatTableDataSource } from '@angular/material';
import buildData from '../../../../../../environments/buildType';
import { SelectionModel } from '@angular/cdk/collections';


export interface ListData {
	[x: string]: any;
	Seq: string;
	DeviceNo : string;
	DeviceExtno : string;
}


@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
	isVisible = false;
	searchName: string;
	crumbsList: object;
	customer: any;
	setConfim: boolean;
	pageIndex: number;
	pageSize: number;
	pageSizeOptions: number[];
	paginatorTotal: number;
	activeChoose: number;
	@ViewChild(MatPaginator, null) paginator: MatPaginator;
	displayedColumns: string[];
	list: any;
	chooseDeleteSeq: number;
	@ViewChild(ExcelUploadComponent, null) excelUpload: ExcelUploadComponent;
	UploadAddr: string;
	downloadInfo: string;
	DeviceType: any = 'smartdev';
	MainType: number;
	GotoAdd: string;
	GotoEdit: string;
	GotoInfo: string;
	// parts: string;
	GotoHistory: string;
	url: string;
	buildingList: any = [];
	checkBuild: any = '';
	building = '';
	isMove = '';
	selection: any;
	remainder = 0;
	codePage = 1;
	codeTotal = 0;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private service: Service,
		private snackBar: MatSnackBar,
		private dialog: MatDialog
	) {
		route.data
			.subscribe(
				(res: any) => {
                    console.log(res)
					this.DeviceType = res.type;
				}
			);
		let curmbsName1: string;
		let crumbsName: string;
		this.url = 'ent/device/monitor/6011';
		this.displayedColumns = ['DeviceNo', 'Model', 'DeviceName', 'DeviceExtNo','Stat', 'Other'];
		if (this.DeviceType === 'smartdev') {
			curmbsName1 = '设备管理';
			crumbsName = '智能设备管理';
			this.MainType = 1;
			this.GotoAdd = 'smartdev/add';
			this.GotoEdit = 'smartdev/edit';
			this.GotoInfo = 'smartdev/info';
			this.GotoHistory = 'smartdev/history';
			this.displayedColumns = ['select', 'DeviceNo', 'Model', 'isMove', 'DeviceName', 'DeviceExtNo','Stat', 'Other'];
			// this.parts = 'smartdev/parts';
		} else if (this.DeviceType === 'secdev') {
			curmbsName1 = '设备管理';
			crumbsName = '安全器材管理';
			this.MainType = 7;
			this.GotoAdd = 'secdev/add';
			this.GotoEdit = 'secdev/edit';
			this.GotoInfo = 'secdev/info';
			this.GotoHistory = 'secdev/history';
			this.displayedColumns = ['DeviceNo', 'Model', 'DeviceName', 'Stat', 'Other'];
		} else if (this.DeviceType === 'commdev') {
			curmbsName1 = '设备管理';
			crumbsName = '通用设备管理';
			this.MainType = 0;
			this.GotoAdd = 'commdev/add';
			this.GotoEdit = 'commdev/edit';
			this.GotoInfo = 'commdev/info';
			this.GotoHistory = 'commdev/history';
		}else if (this.DeviceType === 'devpartsmgmt') {
			curmbsName1 = '设备管理';
			crumbsName = '配件管理';
			this.MainType = 3;
			this.GotoAdd = 'devpartsmgmt/add';
			this.GotoEdit = 'devpartsmgmt/edit';
			this.GotoInfo = 'devpartsmgmt/info';
			this.GotoHistory = 'devpartsmgmt/history';
		} else if (this.DeviceType === 'sparepartsmgmt') {
			curmbsName1 = '设备管理';
			crumbsName = '备品/备件';
			this.MainType = 3;
			this.GotoAdd = 'sparepartsmgmt/add';
			this.GotoEdit = 'sparepartsmgmt/edit';
			this.GotoInfo = 'sparepartsmgmt/info';
			this.GotoHistory = 'sparepartsmgmt/history';
			// this.url = 'ent/devicemodel/6011';
		} else if (this.DeviceType === 'gatewaydev') {
			curmbsName1 = 'IOT管理';
			crumbsName = '智联网关管理';
			this.MainType = 2;
			this.GotoAdd = 'gatewaydev/add';
			this.GotoEdit = 'gatewaydev/edit';
			this.GotoInfo = 'gatewaydev/info';
			this.GotoHistory = 'gatewaydev/history';
			// this.parts = 'commdev/parts';
		}
		this.crumbsList = [
			{ name: curmbsName1, open: false },
			{ name: crumbsName, open: false }
		];
		this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
		this.setConfim = false;
		this.list = null;
		this.pageSizeOptions = [5, 10, 20];
		this.paginatorTotal = 10;
		this.pageIndex = 1;
		this.pageSize = 10;
		this.searchName = null;
		this.downloadInfo = '请下载设备对照表';
		this.getBuildingList();
	}

	ngOnInit() {
		this.selection = new SelectionModel<ListData>(true, []);
		this.building = buildData.buildType;
		if (localStorage.getItem('BemPageIndex')) {
			this.pageIndex = parseInt(localStorage.getItem('BemPageIndex'), null);
		}
		if (localStorage.getItem('BemPageSize')) {
			this.pageSize = parseInt(localStorage.getItem('BemPageSize'), null);
		}
		this.getList();
		if (localStorage.getItem('BemPageIndex')) {
			localStorage.removeItem('BemPageIndex');
		}
		if (localStorage.getItem('BemPageSize')) {
			localStorage.removeItem('BemPageSize');
		}
	}

	@ViewChild("myCanvas", { static: true })
  private readonly myCanvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

	@ViewChild("myCanvasTrue", { static: true })
	private readonly myCanvasTrue: ElementRef<HTMLCanvasElement>;
	private ctxTrue: CanvasRenderingContext2D;

	switchBuildType() {
		this.getList();
	}

	getBuildingList() {
		const data = { null: null };
		this.service.serviceR('ent/building/5001', data, (res: any) => {
			if (res.ResultCode === 0) {
				this.buildingList = res.Result.Buildings;
			}
		});
	}

	switchDeviceType() {
		this.paginatorTotal = 10;
		this.pageIndex = 1;
		this.pageSize = 10;

		let curmbsName1: string;
		let crumbsName: string;
		if (this.DeviceType === 'smartdev') {
			curmbsName1 = '设备管理';
			crumbsName = '智能设备管理';
			this.MainType = 1;
			this.GotoAdd = 'smartdev/add';
			this.GotoEdit = 'smartdev/edit';
			this.GotoInfo = 'smartdev/info';
			this.GotoHistory = 'smartdev/history';
			// this.parts = 'smartdev/parts';
		} else if (this.DeviceType === 'commdev') {
			curmbsName1 = '设备管理';
			crumbsName = '通用设备管理';
			this.MainType = 0;
			this.GotoAdd = 'commdev/add';
			this.GotoEdit = 'commdev/edit';
			this.GotoInfo = 'commdev/info';
			this.GotoHistory = 'commdev/history';
		} else if (this.DeviceType === 'secdev') {
			curmbsName1 = '设备管理';
			crumbsName = '安全器材管理';
			this.MainType = 7;
			this.GotoAdd = 'secdev/add';
			this.GotoEdit = 'secdev/edit';
			this.GotoInfo = 'secdev/info';
			this.GotoHistory = 'secdev/history';
		
		}
		this.crumbsList = [
			{ name: curmbsName1, open: false },
			{ name: crumbsName, open: false }
		];

		this.getList();
	}

	gotoParts(el) {
		localStorage.setItem('bemInfoData', JSON.stringify(el));
		localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
		this.router.navigate(['index/smartdev/parts']);
	}

	goDetails(isMove,id){
		if(isMove ==1 && id !=''){
			this.service.serviceR('ent/maintenance//80081', { MOSeq:id }, (res: any) => {
				console.log(res);
				if (res.ResultCode === 0) {
					localStorage.setItem('orderInfo', JSON.stringify(res.Result.Data));
					this.router.navigate(['index/mainmanage/info']);
				}
			});
		}else{
			return false
		}
	}

	getCanvas(){
		this.isVisible = true
		let numChange = 0;
		let numChangeData = [];
		var image = new Image();
		this.ctx = this.myCanvas.nativeElement.getContext("2d");
    if(this.codePage == this.codeTotal){
			if(this.remainder!==0){
				if(this.codePage > 1){
					numChange = this.remainder+8
				}else{
					numChange = this.remainder
				}
			}else{
				numChange = this.codePage*8
			}
		}else{
			numChange = this.codePage*8
		}
		for(let i=(this.codePage-1)*8; i<numChange; i++){
			numChangeData.push( this.selection.selected[i])
		}
		image.crossOrigin = 'anonymous';
		image.src = 'assets/login/code.jpg';
		image.onload = () =>{
		  setTimeout(() => {
				for(let i=0; i< numChangeData.length; i++){
					if((i+1)%2 == 0){
						this.ctx.drawImage(image, 247, ((i-1)/2)*175,247,175);
						this.textChange(this.ctx,'全生命周期监控数据采集与录入',265,((i-1)/2)*175+85,16,300,2,14)
						this.textChange(this.ctx,'设备编号：' + numChangeData[i].DeviceNo,265,((i-1)/2)*175+105,16,140,2,10)
						this.textChange(this.ctx,'设备名称：' + numChangeData[i].DeviceName + numChangeData[i].DeviceExtno,265,((i-1)/2)*175+125,16,140,2,10)
						this.textChange(this.ctx,'设备型号：' + numChangeData[i].Model,265,((i-1)/2)*175+155,16,140,2,10)
						this.imgUrlChange(this.ctx,numChangeData[i].urlChange,422,((i-1)/2)*175+100)
					}else{
						this.ctx.drawImage(image, 0, i/2*175,247,175);
						this.textChange(this.ctx,'全生命周期监控数据采集与录入',18,(i/2*175)+85,16,300,2,14)
						this.textChange(this.ctx,'设备编号：' + numChangeData[i].DeviceNo,18,(i/2*175)+105,16,140,2,10)
						this.textChange(this.ctx,'设备名称：' + numChangeData[i].DeviceName + numChangeData[i].DeviceExtno,18,(i/2*175)+125,16,140,2,10)
						this.textChange(this.ctx,'设备型号：' + numChangeData[i].Model,18,(i/2*175)+155,16,140,2,10)
						this.imgUrlChange(this.ctx,numChangeData[i].urlChange,175,(i/2*175)+100)
					}
				}
			}, 300);
    }
	}

	getCanvasTrue(){
		let numChange = 0;
		let numChangeData = [];
		var image = new Image();
		this.ctxTrue = this.myCanvasTrue.nativeElement.getContext("2d");
    if(this.codePage == this.codeTotal){
			if(this.remainder!==0){
				if(this.codePage > 1){
					numChange = this.remainder+8
				}else{
					numChange = this.remainder
				}
			}else{
				numChange = this.codePage*8
			}
		}else{
			numChange = this.codePage*8
		}
		for(let i=(this.codePage-1)*8; i<numChange; i++){
			numChangeData.push( this.selection.selected[i])
		}
		image.crossOrigin = 'anonymous';
		image.src = 'assets/login/code.jpg';
		image.onload = () =>{
		  setTimeout(() => {
				for(let i=0; i< numChangeData.length; i++){
					console.log(numChangeData[i].DeviceNo)
					if((i+1)%2 == 0){
						this.ctxTrue.drawImage(image, 1190, ((i-1)/2)*841,1190,841);
						this.textChangeTrue(this.ctxTrue,'全生命周期监控数据采集与录入',1270,((i-1)/2)*841+380,80,800,2,44)
						this.textChangeTrue(this.ctxTrue,'设备编号：' + numChangeData[i].DeviceNo,1270,((i-1)/2)*841+460,40,540,2,40)
						this.textChangeTrue(this.ctxTrue,'设备名称：' + numChangeData[i].DeviceName + numChangeData[i].DeviceExtno,1270,((i-1)/2)*841+560,40,540,2,40)
						this.textChangeTrue(this.ctxTrue,'设备型号：' + numChangeData[i].Model,1270,((i-1)/2)*841+660,40,540,2,40)
						this.imgUrlChangeTrue(this.ctxTrue,numChangeData[i].urlChange,1940,((i-1)/2)*841+420)
					}else{
						this.ctxTrue.drawImage(image, 0, i/2*841,1190,841);
						this.textChangeTrue(this.ctxTrue,'全生命周期监控数据采集与录入',80,(i/2*841)+380,80,800,2,44)
						this.textChangeTrue(this.ctxTrue,'设备编号：' + numChangeData[i].DeviceNo,80,(i/2*841)+460,40,540,2,40)
						this.textChangeTrue(this.ctxTrue,'设备名称：' + numChangeData[i].DeviceName + numChangeData[i].DeviceExtno,80,(i/2*841)+560,40,540,2,40)
						this.textChangeTrue(this.ctxTrue,'设备型号：' + numChangeData[i].Model,80,(i/2*841)+660,40,540,2,40)
						this.imgUrlChangeTrue(this.ctxTrue,numChangeData[i].urlChange,750,(i/2*841)+420)
					}
				}
				var imageImg = this.myCanvasTrue.nativeElement.toDataURL("image/png")
				var save_link = document.createElement('a');
				save_link.href = imageImg;
				save_link.download ='设备二维码.png';
				var clickevent = document.createEvent('MouseEvents');
				clickevent.initEvent('click', true, false);
				save_link.dispatchEvent(clickevent);
			}, 300);
    }
	}

	imgUrlChange(ctx,urlChange, drawX, drawY) {
		var imageTwo = new Image();
		imageTwo.src = urlChange;
		ctx.drawImage(imageTwo, drawX,drawY,55,55);
  }

	imgUrlChangeTrue(ctx,urlChange, drawX, drawY) {
		var imageTwo = new Image();
		imageTwo.src = urlChange;
		ctx.drawImage(imageTwo, drawX,drawY,300,300);
  }

	textChange(ctx, content, drawX, drawY, lineHeight, lineMaxWidth, lineNum,size) {
		var drawTxt = ''; // 当前绘制的内容
		var drawLine = 1; // 第几行开始绘制
		var drawIndex = 0; // 当前绘制内容的索引
		ctx.font = size+"px serif";
		ctx.strokeStyle = '#fff';
		// 判断内容是否可以一行绘制完毕
		if(ctx.measureText(content).width <= lineMaxWidth) {
			// ctx.fillText(content.substring(drawIndex, i), drawX, drawY);
			ctx.strokeText(content,drawX,drawY);//文字边框
		} else {
			for (var i = 0; i < content.length; i++) {
				drawTxt += content[i];
				if (ctx.measureText(drawTxt).width >= lineMaxWidth) {
					if (drawLine >= lineNum) {
						// ctx.fillText(content.substring(drawIndex, i) + '..', drawX, drawY);
						ctx.strokeText(content.substring(drawIndex, i) + '..',drawX,drawY);//文字边框
						break;
					} else {
						// ctx.fillText(content.substring(drawIndex, i + 1), drawX, drawY);
						ctx.strokeText(content.substring(drawIndex, i + 1),drawX,drawY);//文字边框
						drawIndex = i + 1;
						drawLine += 1;
						drawY += lineHeight;
						drawTxt = '';
					}
				} else {
					// 内容绘制完毕，但是剩下的内容宽度不到lineMaxWidth
					if (i === content.length - 1) {
						// ctx.fillText(content.substring(drawIndex), drawX+65, drawY);
						ctx.strokeText(content.substring(drawIndex),drawX+50,drawY);//文字边框
					}
				}
			}
		}
	}

	textChangeTrue(ctx, content, drawX, drawY, lineHeight, lineMaxWidth, lineNum,size) {
		var drawTxt = ''; // 当前绘制的内容
		var drawLine = 1; // 第几行开始绘制
		var drawIndex = 0; // 当前绘制内容的索引
		ctx.font = size+"px serif";
		ctx.strokeStyle = '#fff';
		// 判断内容是否可以一行绘制完毕
		if(ctx.measureText(content).width <= lineMaxWidth) {
			ctx.strokeText(content,drawX,drawY);//文字边框
		} else {
			for (var i = 0; i < content.length; i++) {
				drawTxt += content[i];
				if (ctx.measureText(drawTxt).width >= lineMaxWidth) {
					if (drawLine >= lineNum) {
						ctx.strokeText(content.substring(drawIndex, i) + '..',drawX,drawY);//文字边框
						break;
					} else {
						ctx.strokeText(content.substring(drawIndex, i + 1),drawX,drawY);//文字边框
						drawIndex = i + 1;
						drawLine += 1;
						drawY += lineHeight;
						drawTxt = '';
					}
				} else {
					// 内容绘制完毕，但是剩下的内容宽度不到lineMaxWidth
					if (i === content.length - 1) {
						ctx.strokeText(content.substring(drawIndex),drawX+200,drawY);//文字边框
					}
				}
			}
		}
	}
	// 关闭二维码弹窗
	onCancel(){
		this.isVisible = false
		this.ctx = this.myCanvas.nativeElement.getContext("2d");
		this.ctx.clearRect(0,0,794,1123);
		this.ctxTrue = this.myCanvasTrue.nativeElement.getContext("2d");
		this.ctxTrue.clearRect(0,0,2380,3364);
	}
  // 上一页
	previousPage(){
		if(this.codePage!==1){
			this.ctx = this.myCanvas.nativeElement.getContext("2d");
			this.ctx.clearRect(0,0,794,1123);
			this.ctxTrue = this.myCanvasTrue.nativeElement.getContext("2d");
			this.ctxTrue.clearRect(0,0,2380,3364);
			this.codePage --
			this.getCanvas()
			this.getCanvasTrue()
		}
	}
  // 下一页
	nextPage(){
		if(this.codePage < this.codeTotal){
			this.ctx = this.myCanvas.nativeElement.getContext("2d");
			this.ctx.clearRect(0,0,794,1123);
			this.ctxTrue = this.myCanvasTrue.nativeElement.getContext("2d");
			this.ctxTrue.clearRect(0,0,2380,3364);
			this.codePage ++
			this.getCanvas()
			this.getCanvasTrue()
		}
	}

	downloadCodeImg() {
		console.log(this.selection.selected)
		if(this.DeviceType === 'smartdev'){
			if( this.selection.selected !=''){
				this.codePage = 1;
				this.codeTotal = Math.ceil(this.selection.selected.length/8);
				this.remainder = Math.ceil(this.selection.selected.length%8);
				this.getCanvas()
				this.getCanvasTrue()
			}
		}else{
			const body = {
				FromCache: false,
				CommonSearch: this.searchName == null ? '' : this.searchName,
				MainType: this.MainType,
				PageIndex: this.pageIndex,
				PageSize: this.pageSize
			};
			console.log(body);
			new DownloadFile(body, 'ent/device/qrcode').downloadfile();
		}
	}

	getList() {
		const data = {
			MainType: this.MainType,
			State: 0
		};
		if(this.DeviceType === 'smartdev'){
			this.pageSize = 9999;
		}
		if (this.searchName) {
			Reflect.set(data, 'CommonSearch', this.searchName);
			Reflect.set(data, 'PageIndex', this.pageIndex);
			Reflect.set(data, 'PageSize', this.pageSize);
		} else {
			Reflect.set(data, 'PageIndex', this.pageIndex);
			Reflect.set(data, 'PageSize', this.pageSize);
		}
		if (this.DeviceType === 'sparepartsmgmt') {
			Reflect.set(data, 'stat', 0);
		}
		if (this.checkBuild) {
			Reflect.set(data, 'Building', this.checkBuild);
		}
		if (this.building==='东南水厂' && this.isMove) {
			Reflect.set(data, 'IsMove', Number(this.isMove));
		}
		console.log(data);
		this.service.serviceR(this.url, data, (res: any) => {
			console.log(res);
			if (res.ResultCode === 0) {
				this.list = new MatTableDataSource( res.Result.Devices);
				this.paginatorTotal = res.Result.Total;
			}
		});
	}

	fileBoxChange() {
		this.UploadAddr = 'ent/device/6008';
		this.excelUpload.fileBoxChange();
	}

	fileBoxChange2() {
		this.UploadAddr = 'ent/device/6014';
		this.excelUpload.fileBoxChange();
	}

	goto3d() {
		const dialogRef = this.dialog.open(ThreeDComponent, {
			width: '800px',
			data: {}
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}
	gotoware(element) {
		console.log(element);
		const dialogRef = this.dialog.open(WarehouseOutComponent, {
			width: '400px',
			data: { deviceseq: element.Seq }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			this.getList();
		});
	}
	downloadCodeFile() {
		const body = {
			FromCache: false,
			State: 0,
			CommonSearch: this.searchName,
			MainType: this.MainType,
			PageIndex: this.pageIndex,
			PageSize: this.pageSize
		};
		new DownloadFile(body, 'ent/device/qrcodexlsx').downloadfile();
	}
	
	downloadDeviceFile() {
		let FileNameData = '';
		if (this.DeviceType === 'smartdev') {
			FileNameData = '智能设备管理';
		} else if (this.DeviceType === 'commdev') {
			FileNameData = '通用设备管理';
		} else if (this.DeviceType === 'devpartsmgmt') {
			FileNameData = '配件管理';
		} else if (this.DeviceType === 'sparepartsmgmt') {
			FileNameData = '备品/备件';
		} else if (this.DeviceType === 'gatewaydev') {
			FileNameData = '智联网关管理';
		}
		const body = {
			FromCache: false,
			State: 0,
			CommonSearch: this.searchName == null ? '' : this.searchName,
			MainType: this.MainType,
			FileName: FileNameData
		};
		new DownloadFile(body, 'ent/device/monitor/6111').downloadfile();
	}

	gotoAdd() {
		console.log(this.GotoAdd);
		localStorage.setItem('crumbsName', this.crumbsList[1].name);
		localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
		this.router.navigate(['index/' + this.GotoAdd]);
	}

	// 分页修改时响应方法
	change(event: any) {
		this.pageIndex = event.pageIndex + 1;
		this.pageSize = event.pageSize;
		this.getList();
	}

	gotoInfo(el: any) {
		localStorage.setItem('crumbsName', this.crumbsList[1].name);
		localStorage.setItem('bemInfoData', JSON.stringify(el));
		localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
		this.router.navigate(['index/' + this.GotoInfo]);
	}

	gotoEdit(el: any) {
		localStorage.setItem('crumbsName', this.crumbsList[1].name);
		localStorage.setItem('bemInfoData', JSON.stringify(el));
		localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
		this.router.navigate(['index/' + this.GotoEdit]);
	}
	gotoHistory(el: any) {
		localStorage.setItem('crumbsName', this.crumbsList[1].name);
		localStorage.setItem('bemInfoData', JSON.stringify(el));
		localStorage.setItem('BemPageIndex', JSON.stringify(this.pageIndex));
		localStorage.setItem('BemPageSize', JSON.stringify(this.pageSize));
		this.router.navigate(['index/' + this.GotoHistory]);
	}

	// 控制confim模态框
	showConfim(seq: number, state: number) {
		if (state === 1) {
			return;
		}
		this.chooseDeleteSeq = seq;
		this.setConfim = !this.setConfim;
	}

	tableConfimResult(...data: boolean[]) {
		this.setConfim = false;
		const confimResultState = data[0];
		if (confimResultState === true) {
			this.service.serviceR('ent/device/6004', { DSeq: this.chooseDeleteSeq }, (res: any) => {
				if (res.ResultCode === 0) {
					this.snackBar.open('删除成功', '确认', {
						duration: 1600,
						verticalPosition: 'top',
						panelClass: 'snack-bar-color-info'
					});
					this.getList();
				}
			});
		}
	}
	check(row) {
		this.selection.toggle(row);
		setTimeout(() => {
			row.urlChange = (<HTMLImageElement>document.querySelector(`.C_${row.DeviceNo}`).children[0]).src
		}, 300)
	}
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.list.data.length;
		return numSelected === numRows;
	}
	masterToggle() {
		this.isAllSelected() ?
		this.selection.clear() :
		this.list.data.forEach((row: ListData, index) => {
			this.selection.select(row)
			row.urlChange = (<HTMLImageElement>document.querySelector(`.C_${row.DeviceNo}`).children[0]).src
		});
		console.log(this.selection.selected)
	}
}

