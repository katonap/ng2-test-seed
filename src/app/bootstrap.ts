import {DeprecatedFormsModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppComponent} from './app-component';
import {LoginService} from './login-service';
import {UserService} from './user-service';

@NgModule({
	declarations: [AppComponent],
	providers: [LoginService, UserService],
	imports: [BrowserModule, DeprecatedFormsModule],
	bootstrap: [AppComponent],
})
export class MyAppModule { }

platformBrowserDynamic().bootstrapModule(MyAppModule);