import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppComponent} from './app-component';
import {BorderComponent} from './border-component';
import {GreetingComponent} from './greeting-component';
import {LoginService} from './login-service';
import {UserService} from './user-service';

@NgModule({
	bootstrap: [AppComponent],
	imports: [
		BrowserModule,
		FormsModule
	],
	declarations: [
		AppComponent,
		BorderComponent,
		GreetingComponent
	],
	providers: [
		LoginService,
		UserService
	],
})
export class MyAppModule { }

platformBrowserDynamic().bootstrapModule(MyAppModule);