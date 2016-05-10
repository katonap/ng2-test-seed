import {bootstrap} from '@angular/platform-browser-dynamic';

import {AppComponent} from './app-component';
import {LoginService} from './login-service';
import {UserService} from './user-service';

bootstrap(AppComponent, [LoginService, UserService]);