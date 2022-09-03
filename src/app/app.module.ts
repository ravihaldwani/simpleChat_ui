import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { GroupListComponent } from './components/group-list/group-list.component';
import { HttpClientModule } from '@angular/common/http';
import { GroupTileComponent } from './components/group-tile/group-tile.component';
import { GroupViewComponent } from './components/group-view/group-view.component';

@NgModule({
  declarations: [AppComponent, GroupListComponent, GroupTileComponent, GroupViewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
