import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeachCodeComponent } from './seach-code.component';

describe('SeachCodeComponent', () => {
  let component: SeachCodeComponent;
  let fixture: ComponentFixture<SeachCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeachCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeachCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
