import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProviderComponent } from './provider/provider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccesspointComponent } from './accesspoint/accesspoint.component';

@NgModule({
  declarations: [
    AppComponent,
    ProviderComponent,
    AccesspointComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
