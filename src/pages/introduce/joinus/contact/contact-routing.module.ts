import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';

const ContactRoutes: Routes = [
  { path: '', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ContactRoutes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
