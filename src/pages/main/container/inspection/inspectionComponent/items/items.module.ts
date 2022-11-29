import { CommonModule } from '@angular/common';
// import { CommonUseModule } from '../../../../../common/common.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FeedbacktypeTranslate } from './pipe/feedbacktype.pipe';
import { ItemsComponent } from './items.component';
import { DeviceDialogModule } from '../../../component/dialog/device-dialog/device-dialog.module';
import { BuildingDialogModule } from '../../../component/dialog/building-dialog/building-dialog.module';
import { SpacetreeComponent } from './component/spacetree/spacetree.component';
import { TemplateComponent } from './component/template/template.component';
import { ItemComponent } from './component/item/item.component';

@NgModule({
    imports : [
        CommonModule,
        // CommonUseModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatPaginatorModule,
        DeviceDialogModule,
        BuildingDialogModule
    ],
    declarations: [
        ItemsComponent,
        SpacetreeComponent,
        TemplateComponent,
        ItemComponent,
        FeedbacktypeTranslate
    ],
    exports: [
        ItemsComponent,
        FeedbacktypeTranslate
    ]
})

export class ItemsModule {}
