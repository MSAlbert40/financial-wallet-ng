import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseNewComponent } from './enterprise-new.component';

describe('EnterpriseNewComponent', () => {
  let component: EnterpriseNewComponent;
  let fixture: ComponentFixture<EnterpriseNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
