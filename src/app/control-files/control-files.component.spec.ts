import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlFilesComponent } from './control-files.component';

describe('ControlFilesComponent', () => {
  let component: ControlFilesComponent;
  let fixture: ComponentFixture<ControlFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
