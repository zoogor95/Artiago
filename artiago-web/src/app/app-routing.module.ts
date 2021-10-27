import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './admin/album/album.component';
import { CategoryComponent } from './admin/category/category.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EventUserComponent } from './admin/event-user/event-user.component';
import { EventComponent } from './admin/event/event.component';
import { ItemComponent } from './admin/item/item.component';
import { LiveUserComponent } from './admin/live-user/live-user.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { SessionVideoComponent } from './admin/session-video/session-video.component';
import { TagComponent } from './admin/tag/tag.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { UserComponent } from './admin/user/user.component';
import { EventRegistrationComponent } from './default/event-registration/event-registration.component';
import { LandingComponent } from './default/landing/landing.component';
import { LiveRegistrationComponent } from './default/live-registration/live-registration.component';
import { ProductComponent } from './default/product/product.component';
import { SearchComponent } from './default/search/search.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'detail', component: ProductComponent },
  { path: 'search', component: SearchComponent },
  { path: 'event-registration', component: EventRegistrationComponent },
  { path: 'live-registration', component: LiveRegistrationComponent },
  { 
    path: 'admin', 
    children: [
      { path: '', component: DashboardComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'album', component: AlbumComponent },
      { path: 'event', component: EventComponent },
      { path: 'event-user', component: EventUserComponent },
      { path: 'live-user', component: LiveUserComponent },
      { path: 'video-session', component: SessionVideoComponent },
      { path: 'tag', component: TagComponent },
      { path: 'user', component: UserComponent },
      { path: 'user-mangement', component: UserManagementComponent },
      { path: 'product', component: ItemComponent },
    ]
  },
  { 
    path: 'admin', 
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forget-password', component: RegisterComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
