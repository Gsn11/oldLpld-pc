import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    setProductConfim: boolean;
    @Input() setProduct: string;
    productList: string[];
    setProductList: string;
    productName: string;
    inputProduct: boolean;
    deleteProductIndex: number;
    constructor() {
        this.productName = '';
        this.inputProduct = false;
        this.setProductConfim = false;
    }

    ngOnInit() {
        this.setProductList = this.setProduct;
        if (this.setProductList) {
            this.productList = this.setProductList.split(',');
            this.setProductList += ',';
        } else {
            this.productList = [];
        }
    }

    addProduct() {
        this.inputProduct = !this.inputProduct;
        this.productName = '';
    }

    inputItem() {
        this.productList.push(this.productName);
        this.setProductList += this.productName + ',';
        this.addProduct();
    }
    // 用户删除产品 index: 下标
    deleteItem(index: number) {
        this.deleteProductIndex = index;
        this.showProductConfim();
    }

    showProductConfim() {
        this.setProductConfim = !this.setProductConfim;
    }
    // confim组件返回值 true 确定 / false 取消
    productConfimResult(...data: any) {
        this.setProductConfim = false;
        const confimResultState = data[0];
        if (confimResultState === true) {
            this.productList.splice(this.deleteProductIndex, 1);
            this.setProductList = '';
            for (const p of this.productList) {
                this.setProductList += p + ',';
            }
        }
    }
}
