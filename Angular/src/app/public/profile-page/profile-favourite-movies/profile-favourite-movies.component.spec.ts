import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFavouriteMoviesComponent } from './profile-favourite-movies.component';

describe('ProfileFavouriteMoviesComponent', () => {
  let component: ProfileFavouriteMoviesComponent;
  let fixture: ComponentFixture<ProfileFavouriteMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFavouriteMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFavouriteMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
