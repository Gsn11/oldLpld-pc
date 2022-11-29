import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Service } from '../../../../../service/service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    animations: [
        trigger('firstSwitch', [
            state('open', style({
                maxHeight: '540px',
                opacity: 1,
            })),
            state('closed', style({
                maxHeight: '0px',
                opacity: 0,
            })),
            transition('open => closed', [
                animate('0s')
            ]),
            transition('closed => open', [
                animate('0.24s')
            ])
        ]), trigger('thirdSwitch', [
            state('open', style({
                maxHeight: '540px',
                opacity: 1,
            })),
            state('closed', style({
                maxHeight: '0px',
                opacity: 0,
            })),
            transition('open => closed', [
                animate('0s')
            ]),
            transition('closed => open', [
                animate('0.24s')
            ])
        ])
    ]
})

export class IndexComponent implements OnInit {
    tree: any;
    bemUserInfo: any;
    sidebarData: any;  // 菜单
    customer: any;
    crumbsList: object;
    nowItemName: string;
    newChildrenItem: any;
    allSwitchIsOpen: boolean;
    changeItem: any;
    constructor(
        private service: Service,
        private snackBar: MatSnackBar,
    ) {
        this.bemUserInfo = JSON.parse(localStorage.getItem('bemUserInfo'));
        this.customer = this.bemUserInfo.Customer.Seq;
        this.newChildrenItem = new FormControl('', [
            Validators.required
        ]);
        this.crumbsList = [
            { name: '参数设置', open: false },
            { name: '单位菜单管理', open: false }
        ];
        this.sidebarData = null;
        this.allSwitchIsOpen = false;
    }

    ngOnInit() {
        this.getMenu();
    }

    getMenu() {
        const searchData = {
            Customer: this.customer,
            FromCache: false,
        };
        this.service.serviceR('ent/params/customermenu/11901', searchData, (searchResult: any) => {
            const menu = JSON.parse(localStorage.getItem('bemUserInfo'));
            menu.Menu = searchResult.Result.CustomerMenu;
            localStorage.setItem('bemUserInfo', JSON.stringify(menu));
            this.sidebarData = menu.Menu;
            for (const s of this.sidebarData) {
                if (s.submenu) {
                    Reflect.set(s, 'useId', s.name);
                    Reflect.set(s, 'isChoose', false);
                    Reflect.set(s, 'display', true);
                    Reflect.set(s, 'children', s.submenu);
                    s.switch = false;
                    for (const c of s.submenu) {
                        Reflect.set(c, 'useId', c.name);
                        Reflect.set(c, 'isChoose', false);
                        Reflect.set(c, 'display', true);
                        Reflect.set(c, 'children', c.submenu);
                        if (c.submenu) {
                            c.switch = false;
                            for (const t of c.submenu) {
                                Reflect.set(t, 'useId', t.name);
                                Reflect.set(t, 'isChoose', false);
                                Reflect.set(t, 'display', true);
                            }
                        }
                    }
                }
                this.nowItemName = this.newChildrenItem.value;
            }
            this.changeItem = this.sidebarData[0];
            this.newChildrenItem.setValue(this.sidebarData[0].name);
            this.nowItemName = this.newChildrenItem.value;
            this.allSwitchIsOpen = true;
        });
    }

    initailChooseData(list: any) {
        list.map((item: any) => {
            item.isChoose = false;
            if (item.children) {
                this.initailChooseData(item.children);
            }
        });
    }

    treeChange(tree: any) {
        this.initailChooseData(this.sidebarData);
        this.nowItemName = tree.name;
        this.changeItem = tree;
        this.newChildrenItem.setValue(tree.name);
    }

    setData(menus: any, CustomerMenus: any = {}) {
        for (const m of menus) {
            if (this.changeItem.id === m.id) {
                Reflect.set(CustomerMenus, m.id, this.newChildrenItem.value);
            } else {
                Reflect.set(CustomerMenus, m.id, m.name);
            }
            if (m.submenu) {
                this.setData(m.submenu, CustomerMenus);
            }
        }
        return CustomerMenus;
    }

    userSave() {
        const data: any = {
            Customer: this.customer,
            CustomerMenus: [this.setData(this.sidebarData)]
        };
        this.service.serviceR('ent/params/customermenu/11902', data, (res: any) => {
            if (res.ResultCode === 0) {
                this.snackBar.open('请手动刷新页面获取修改结果', '确认', {
                    duration: 1600,
                    verticalPosition: 'top',
                    panelClass: 'snack-bar-color-info'
                });
                this.getMenu();
            }
        });
    }

    getnewChildrenItemErrorMessage() {
        return this.newChildrenItem.hasError('required') ? '请输入选中菜单名称' : '';
    }
}

