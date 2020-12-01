import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpacexLaunchComponent } from './spacex-launch/spacex-launch.component';

const routes: Routes = [
  {path:'', redirectTo:'/spacex-launch',pathMatch:'full'},
  {
    path:'spacex-launch',
    component:SpacexLaunchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
