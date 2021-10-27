import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './default/landing/landing.component';
import { ProductComponent } from './default/product/product.component';
import { SearchComponent } from './default/search/search.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { ForgetPasswordComponent } from './admin/forget-password/forget-password.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserComponent } from './admin/user/user.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { TagComponent } from './admin/tag/tag.component';
import { AlbumComponent } from './admin/album/album.component';
import { CategoryComponent } from './admin/category/category.component';
import { EventComponent } from './admin/event/event.component';
import { SessionVideoComponent } from './admin/session-video/session-video.component';
import { EventUserComponent } from './admin/event-user/event-user.component';
import { LiveUserComponent } from './admin/live-user/live-user.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { HeaderComponent } from './default/header/header.component';
import { FooterComponent } from './default/footer/footer.component';
import { EventRegistrationComponent } from './default/event-registration/event-registration.component';
import { LiveRegistrationComponent } from './default/live-registration/live-registration.component';
import { ItemComponent } from './admin/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ProductComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    DashboardComponent,
    UserComponent,
    UserManagementComponent,
    TagComponent,
    AlbumComponent,
    CategoryComponent,
    EventComponent,
    SessionVideoComponent,
    EventUserComponent,
    LiveUserComponent,
    AdminNavbarComponent,
    HeaderComponent,
    FooterComponent,
    EventRegistrationComponent,
    LiveRegistrationComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
