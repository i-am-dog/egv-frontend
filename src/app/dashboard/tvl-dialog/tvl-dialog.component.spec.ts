import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvlDialogComponent } from './tvl-dialog.component';

describe('TvlDialogComponent', () => {
  let component: TvlDialogComponent;
  let fixture: ComponentFixture<TvlDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvlDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
