import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigOperationComponent } from './config-operation.component';

describe('ConfigOperationComponent', () => {
  let component: ConfigOperationComponent;
  let fixture: ComponentFixture<ConfigOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
