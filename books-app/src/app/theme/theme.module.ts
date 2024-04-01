import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateThemeComponent } from './create-theme/create-theme.component';
import { CurrentThemeComponent } from './current-theme/current-theme.component';
import { ThemeRoutingModule } from './theme-routing.module';
import { ThemesListComponent } from './themes-list/themes-list.component';
import { RecentPostsComponent } from './recent-posts/recent-posts.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { EditThemeComponent } from './edit-theme/edit-theme.component';
import { SearchThemeComponent } from './search-theme/search-theme.component';

@NgModule({
  declarations: [
    EditThemeComponent,
    CreateThemeComponent,
    CurrentThemeComponent,
    ThemesListComponent,
    RecentPostsComponent,
    MainComponent,
    SearchThemeComponent,
  ],
  imports: [CommonModule, ThemeRoutingModule, FormsModule],
  exports: [RecentPostsComponent, SearchThemeComponent],
})
export class ThemeModule {}
