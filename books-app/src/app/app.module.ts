import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemesListComponent } from './theme/themes-list/themes-list.component';

import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './theme/main/main.component';
import { SharedModule } from './shared/shared.module';
import { HomeStaticComponent } from './home-static/home-static.component';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { ThemeModule } from './theme/theme.module';
import { ErrorComponent } from './error/error.component';
import { FormsModule } from '@angular/forms';
import { appInterceptorProvider } from './app.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeStaticComponent,
    HomeComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,

    CoreModule,
    SharedModule,
    HttpClientModule,
    UserModule,
    ThemeModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
