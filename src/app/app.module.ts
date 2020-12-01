import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpacexLaunchComponent } from './spacex-launch/spacex-launch.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from './spacex-launch/filter/filter.component';
import { MissionCardComponent } from './spacex-launch/mission-card/mission-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SpacexLaunchComponent,
    MissionCardComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
