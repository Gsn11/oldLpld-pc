import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-editregion',
    templateUrl: './editRegion.component.html',
    styleUrls: ['./editRegion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRegionComponent implements OnInit {
    // companyData: any;
    @Input() setProvince: string;
    @Input() setCity: string;
    @Input() setDistrict: string;
    region: any;
    // 对应各选项卡
    provinceSelect: any;
    citySelect: any;
    districtSelect: any;
    // 对应初始化后选择后code存储
    provinceCode: string;
    cityCode: string;
    districtCode: string;
    // 对应city/district是否展开
    cityState: boolean;
    districtState: boolean;
    // 记录当前选中项元素内的下一级地区内容
    cityRegion: any;
    districtRegion: any;
    constructor() {
        this.cityRegion = '';
        this.districtRegion = '';
        this.provinceSelect = new FormControl();
        this.citySelect = new FormControl();
        this.districtSelect = new FormControl();
        this.cityState = false;
        this.districtState = false;
        this.region = JSON.parse(localStorage.getItem('bemRegionJSON'));
    }

    ngOnInit() {
        // 初始化比较当前是否已存在选中地区
        // true 进行数据绑定，并显示下一项选择卡
        // ...往下以此类推
        if (this.setProvince) {
            for (const i of this.region) {
                if (i.code === this.setProvince) {
                    this.provinceCode = i.code;
                    this.provinceSelect.setValue(i.region);
                    this.cityState = true;
                    this.cityRegion = i.regionEntitys;
                }
            }
        } else {
            this.provinceCode = '';
        }
        if (this.setCity) {
            if (this.cityRegion) {
                for (const c of this.cityRegion) {
                    if (c.code === this.setCity) {
                        this.cityCode = c.code;
                        this.citySelect.setValue(c.region);
                        this.districtState = true;
                        this.districtRegion = c.regionEntitys;
                    }
                }
            } else {
                // console.log('search cityResult is empty!');
            }
        } else {
            this.cityCode = '';
        }
        if (this.setDistrict) {
            if (this.districtRegion) {
                for (const d of this.districtRegion) {
                    if (d.code === this.setDistrict) {
                        this.districtCode = d.code;
                        this.districtSelect.setValue(d.region);
                    }
                }
            } else {
                // console.log('search districtResult is empty!');
            }
        } else {
            this.districtCode = '';
        }
    }
    // 选项卡第一级改变事件
    // 初始化后两项数据存储的下一级元素，并将展开状态默认关闭
    // 选中项是否是有效值 true：
    // 判断是否选中有效选项，true 记录当前项code，并记录下一级地区元素
    // 此后打开下一级选项卡
    // false：关闭下一级选项卡

    // ...往后以此类推
    firstSelectChange() {
        this.cityRegion = [];
        this.districtRegion = [];
        this.cityState = false;
        this.districtState = false;
        if (this.provinceSelect.value) {
            for (const i of this.region) {
                if (i.region === this.provinceSelect.value) {
                    this.provinceCode = i.code;
                    this.cityRegion = i.regionEntitys;
                }
            }
            this.cityState = true;
        } else {
            this.cityState = false;
        }
    }

    secondSelectChange() {
        this.districtState = false;
        if (this.citySelect.value) {
            for (const c of this.cityRegion) {
                if (c.region === this.citySelect.value) {
                    this.cityCode = c.code;
                    this.districtRegion = c.regionEntitys;
                }
            }
            this.districtState = true;
        } else {
            this.districtState = false;
        }
    }

    thirdSelectChange() {
        for (const d of this.districtRegion) {
            if (d.region === this.districtSelect.value) {
                this.districtCode = d.code;
            }
        }
    }
}
