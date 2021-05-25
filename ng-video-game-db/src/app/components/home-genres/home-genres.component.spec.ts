import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGenresComponent } from './home-genres.component';

describe('HomeGenresComponent', () => {
  let component: HomeGenresComponent;
  let fixture: ComponentFixture<HomeGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGenresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
