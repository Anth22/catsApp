import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollCatComponent } from './poll-cat.component';

describe('PollCatComponent', () => {
  let component: PollCatComponent;
  let fixture: ComponentFixture<PollCatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PollCatComponent]
    });
    fixture = TestBed.createComponent(PollCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
