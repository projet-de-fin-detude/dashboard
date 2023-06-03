import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ClientsComponent } from './components/clients/clients.component';
import { Routes ,RouterModule} from '@angular/router';
import { MedecinesComponent } from './components/medecines/medecines.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CategoriesComponent } from './components/categories/categories.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnalyticsComponent } from './components/analytics/analytics.component';

 const routes: Routes= [
  { path: '', component: HomeComponent,
children: [
  { path: 'orders', component: OrdersComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'medecines', component: MedecinesComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: '', redirectTo: 'analytics', pathMatch: 'full' },
] },

]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrdersComponent,
    ClientsComponent,
    MedecinesComponent,
    CategoriesComponent,
    AnalyticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
