import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchThemeComponent } from './search-theme.component';

describe('SearchThemeComponent', () => {
  let component: SearchThemeComponent;
  let fixture: ComponentFixture<SearchThemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchThemeComponent]
    });
    fixture = TestBed.createComponent(SearchThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
