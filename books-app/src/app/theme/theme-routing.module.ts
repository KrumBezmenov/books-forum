import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CreateThemeComponent } from './create-theme/create-theme.component';
import { CurrentThemeComponent } from './current-theme/current-theme.component';
import { AuthActivate } from '../guards/auth.activate';
import { EditThemeComponent } from './edit-theme/edit-theme.component';
import { SearchThemeComponent } from './search-theme/search-theme.component';

const routes: Routes = [
  {
    path: 'themes',
    children: [
      { path: '', pathMatch: 'full', component: MainComponent },
      { path: ':themeId/edit', component: EditThemeComponent },
      { path: ':themeId/details', component: CurrentThemeComponent },
    ],
  },
  {
    path: 'create',
    component: CreateThemeComponent,
    canActivate: [AuthActivate],
  },
  { path: 'search', component: SearchThemeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeRoutingModule {}
