import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Service } from '../../../../../service/service';
import { SpacetreeComponent } from './component/spacetree/spacetree.component';
import { TemplateComponent } from './component/template/template.component';
import { ItemComponent } from './component/item/item.component';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {
    @Input() Items: any;
    @Input() MaintenanceTemplates: any;
    @Input() Builds: any;
    @Output() checkPrice = new EventEmitter<any>();
    @ViewChild(SpacetreeComponent, null) spaceComponent: SpacetreeComponent;
    @ViewChild(TemplateComponent, null) templateComponent: TemplateComponent;
    @ViewChild(ItemComponent, null) itemComponent: ItemComponent;
    constructor(
        private service: Service,
    ) {}

    ngOnInit() {
        console.log(this.Items);
        if (this.Items.length !== 0) {
            this.getBuildings(this.Items[0].Building);
        }
        for (const b of this.Builds) {
            Reflect.set(b, 'uChoose', false);
            Reflect.set(b, 'uSwitch', false);
            Reflect.set(b, 'uChildren', []);
        }
    }

    getBuildings(seq: number) {
        const data = {
            State: 0,
            Buildings: seq
        };
        const query = {
            Buildings: seq
        };
        this.service.serviceR('ent/building/monitor/5001', data, (res: any) => {
            if (res.ResultCode === 0) {
                const b = res.Result.Buildings[0];
                if (b) {
                    if (b.DistrictPriceVisit) {
                        Reflect.set(query, 'visit', b.DistrictPriceVisit);
                        this.checkPrice.emit(query);
                    } else if (b.CityPriceVisit) {
                        Reflect.set(query, 'visit', b.CityPriceVisit);
                        this.checkPrice.emit(query);
                    } else if (b.ProvincePriceVisit) {
                        Reflect.set(query, 'visit', b.ProvincePriceVisit);
                        this.checkPrice.emit(query);
                    } else {
                        Reflect.set(query, 'visit', 0);
                        this.checkPrice.emit(query);
                    }
                } else {
                    Reflect.set(query, 'visit', 0);
                    this.checkPrice.emit(0);
                }
            }
        });
    }

    itemModalBox(type: string = 'add', index?: number) {
        this.itemComponent.itemModalBox(type, index);
    }

    tamplateModalBox() {
        this.templateComponent.tamplateModalBox();
    }

    spaceModalBox() {
        this.spaceComponent.spaceModalBox();
    }

    deleteItem(index: number) {
        this.Items.splice(index, 1);
        if (this.Items.length === 0) {
            this.checkPrice.emit(0);
        } else {
            let b: number;
            if (this.Items[0].BuildingSeq) {
                b = this.Items[0].BuildingSeq;
            } else {
                b = this.Items[0].Building;
            }
            this.getBuildings(b);
        }
    }
}
