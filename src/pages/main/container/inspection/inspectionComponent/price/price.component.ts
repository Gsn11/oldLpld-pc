import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from '../../../../../service/service';
import { DeviceDialogComponent } from '../../../component/dialog/device-dialog/device-dialog.component';

@Component({
    selector: 'app-price',
    templateUrl: './price.component.html',
    styleUrls: ['./price.component.scss']
})

export class PriceComponent implements OnInit {
    customer: number;
    @Input() Items: any;
    ModalShow: boolean;
    ServiceProviders: any;
    // 模板库
    @Input() MaintenceTemplates: any;
    treeModalShow: boolean;
    radioValue: number;
    CustomerOfferItems: any;
    SelectCustomerOfferItems: any;
    SubSystems: any;
    SelectSubSystems: any;
    itemShow: boolean;
    Type: string;
    Index: number;
    ItemName: string;
    DeviceItemSeq: number;
    Price: number;
    PriceItemType: number;
    deviceSelect: any;
    deviceType: string;
    deviceName: string;
    constructor(
        private service: Service,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
    ) {
        this.customer = JSON.parse(localStorage.getItem('bemUserInfo')).Customer.Seq;
        this.SelectCustomerOfferItems = new FormControl('');
        this.SelectSubSystems = new FormControl('');
        this.ItemName = null;
        this.DeviceItemSeq = null;
        this.Price = 0;
        this.deviceSelect = null;
        this.deviceName = '点击选择设备';
        this.deviceType = null;
        this.PriceItemType = null;
    }

    ngOnInit() {
        this.Items = [];
        const data = {
            State: 0,
        };
        this.service.serviceR('ent/serviceprovider/8511', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.ServiceProviders = res.Result.ServiceProviders;
            }
        });
        this.service.serviceR('ent/params/subsys/monitor/10911', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.SubSystems = res.Result.SubSystems;
            }
        });
        this.getSubsystemPrice();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DeviceDialogComponent, {
            width: '1080px',
            data: { type: this.deviceType }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deviceSelect = result;
                this.deviceName = result.DeviceName + ' - ' + result.DeviceNo + ' - ' + result.Model;
            } else {
                this.deviceSelect = null;
                this.deviceName = '请点击选择设备';
            }
        });
    }

    getSubsystemPrice(seq: number = null) {
        const data = {
            State: 0
        };
        if (seq !== null) {
            Reflect.set(data, 'Subsys', seq);
        }
        this.service.serviceR('ent/maintenance/monitor/8611', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.CustomerOfferItems = res.Result.CustomerOfferItems;
            }
        });
    }

    subsystemChange(event: any) {
        this.getSubsystemPrice(event.value);
    }

    ModalBox() {
        this.ModalShow = !this.ModalShow;
    }

    treeCancel() {
        this.treeModalShow = false;
        this.radioValue = null;
    }

    tamplateModalBox() {
        this.treeModalShow = !this.treeModalShow;
    }

    radioChange(seq: number) {
        if (this.radioValue === seq) {
            return;
        }
        this.radioValue = seq;
    }

    templateSave() {
        if (!this.SelectCustomerOfferItems.value) {
            this.snackBar.open('请确认选中价格条目', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            return;
        }
        this.treeModalShow = !this.treeModalShow;
        for (const s of this.SelectCustomerOfferItems.value) {
            for (const c of this.CustomerOfferItems) {
                if (c.COISeq === s) {
                    Reflect.set(c, 'Item', c.ItemName);
                    Reflect.set(c, 'ItemSeq', c.COISeq);
                    this.Items.push(c);
                }
            }
        }
    }

    deleteItem(index: number) {
        this.Items.splice(index, 1);
    }
    // ----
    itemModalBox(type: string = 'add', index?: number) {
        this.Type = type;
        this.itemShow = !this.itemShow;
        if (type === 'add') {
            this.deviceName = '点击选择设备';
            this.ItemName = null;
            this.DeviceItemSeq = null;
            this.Price = null;
            this.PriceItemType = null;
        } else {
            this.Index = index;
            this.ItemName = this.Items[index].ItemName || this.Items[index].Item;
            this.DeviceItemSeq = this.Items[index].Seq || this.Items[index].COISeq;
            this.PriceItemType = this.Items[index].Type;
            if (this.Items[index].PricePayee) {
                this.Price = this.Items[index].PricePayee;
            } else {
                this.Price = this.Items[index].Price;
            }
            this.deviceSelect = this.Items[index];
            if (this.deviceSelect.DeviceName) {
                this.deviceName = this.deviceSelect.DeviceName + ' - ' + this.deviceSelect.DeviceNo;
            } else {
                this.deviceName = '点击选择设备';
            }
            // s(this.deviceSelect);
        }
    }

    itemCancel() {
        this.itemShow = false;
    }

    userSave() {
        if (this.ItemName === '' || this.ItemName === null) {
            this.snackBar.open('请输入报价条目', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            return;
        }
        if (!this.deviceSelect) {
            this.snackBar.open('请选择设备', '确认', {
                duration: 1600,
                verticalPosition: 'top',
                panelClass: 'snack-bar-color-danger'
            });
            return;
        }
        const d = {};
        Reflect.set(d, 'Item', this.ItemName);
        Reflect.set(d, 'ItemName', this.ItemName);
        Reflect.set(d, 'Price', this.Price);
        Reflect.set(d, 'Type', this.PriceItemType);
        Reflect.set(d, 'Device', this.deviceSelect.Seq);
        Reflect.set(d, 'DeviceNo', this.deviceSelect.DeviceNo);
        Reflect.set(d, 'DeviceName', this.deviceSelect.DeviceName);
        if (this.Type === 'add') {
            this.Items.push(d);
        } else {
            this.Items[this.Index] = d;
        }
        this.itemShow = !this.itemShow;
    }
}
