import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargementComponent } from './rechargement.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Location } from '@angular/common';

describe('RechargementComponent', () => {
  let component: RechargementComponent;
  let fixture: ComponentFixture<RechargementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargementComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`'choiceModePaiement' should have update 'choixOperator' to 'mtn' `, () => {
    const fixture = TestBed.createComponent(RechargementComponent);
    const app = fixture.componentInstance;
    app.choiceModePaiement("mtn");
    expect(app.choixOperator).toEqual('mtn');
  });

  it(`'choiceModePaiement' should have update 'input selected' to 'mtn' `, () => {
    const fixture = TestBed.createComponent(RechargementComponent);
    const app = fixture.componentInstance;
    app.choiceModePaiement("mtn");
    expect(app.GetFormOperatorValue['operator'].value).toEqual('mtn');
  });

  it(`should have verificate if 'choixOperator' is equal to value  selected`, () => {
    const fixture = TestBed.createComponent(RechargementComponent);
    const app = fixture.componentInstance;
    const event = { target: { value: "mtn" }};
    app.changeOperator(event.target);
   expect(app.choixOperator).toEqual("mtn");
  });
});
