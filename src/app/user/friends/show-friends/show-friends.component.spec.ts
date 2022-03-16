import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFriendsComponent } from './show-friends.component';

describe('ShowFriendsComponent', () => {
  let component: ShowFriendsComponent;
  let fixture: ComponentFixture<ShowFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFriendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
