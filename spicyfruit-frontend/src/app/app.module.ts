import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {ContentLayoutComponent} from './layouts/content/content-layout.component';
import {FullLayoutComponent} from './layouts/full/full-layout.component';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {OAuthService} from './shared/auth/o-auth.service';
import {AuthGuard} from './shared/auth/auth-guard.service';
import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';

import * as $ from 'jquery';
import {SweetAlert} from './shared/services/sweetalert.service';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';

let config = new AuthServiceConfig([{
  id: GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider('158868165679-jnpu66p9i0obn77m20p4o4f06o99hgou.apps.googleusercontent.com')
}]);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SocialLoginModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [
    OAuthService,
    AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: (provideConfig)
    },
    SweetAlert
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
