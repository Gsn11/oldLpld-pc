import { Component } from '@angular/core';
import { Service } from '../service/service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})


export class MainComponent {
	meunSwitch: boolean;
	Isentver: string;
	data: object[];
	isShowWar: boolean;
	constructor(private service: Service, private router: Router) {
		this.data = [];
		this.isShowWar = false;
		this.meunSwitch = true;
		this.Isentver = JSON.parse(localStorage.getItem('bemUserInfo')).Isentver;
		
	}

	swtichMeun(s: boolean) {
		this.meunSwitch = s;
	}
	ngOnInit() {
		this.getWarn()
		setInterval( () => {
			this.getWarn()
		}, 60000)
		
	}

	getWarn() {
		const warnNum = localStorage.getItem('warn') || '0'
		const body = {
			CommonSearch: '',
			CSeq: JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq,
			AlertType: '0,1'
		};
		this.service.serviceR('ent/diagalert/9101', body, (res: any) => {
			if (res.ResultCode === 0) {
				console.log(res.Result.AlertList)
				this.data = res.Result.AlertList.filter(o => {
					if(o.orderState === -1){
						return o
					}
				})
				if(warnNum === this.data.length.toString()) return
				
				const el: any = document.getElementById('AudioErr')
				setTimeout(() => {
					el.play()
				}, 300)
				this.isShowWar = true;
				localStorage.setItem('warn', this.data.length.toString())
				setTimeout(() => {
					this.isShowWar = false;
					el.pause()
				}, 30000)
			}
		});
	}
	jumpDia(){
		const el: any = document.getElementById('AudioErr')
		el.pause()
		this.router.navigate(['index/diagalert']);
		this.isShowWar = false;
	}
}
