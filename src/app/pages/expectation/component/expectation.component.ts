import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExpectationsDoneRequest } from "src/app/auth/types/expectations-done-request.interface";
import { ExpectationInterface } from "src/app/shared/models/expectation.interface";
import { ShareInterface } from "src/app/shared/models/share.interface";
import { ExpectationService } from "src/app/shared/services/expectation.service";
import { ShareService } from "src/app/shared/services/share.service";

@Component({
  selector: 'expectation',
  templateUrl: './expectation.component.html'
})
export class ExpectationComponent {
  shares: ShareInterface[] = [];
  expectations: ExpectationInterface[] = [];
  form = this.fb.group({});
  errorMessage: string = '';

  constructor(
    private shareService: ShareService,
    private expectationService: ExpectationService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getShares();
    this.getExpectations();
  }

  getShares(): void{
    this.shareService
      .getShares()
      .subscribe({
        next: (response) => {
          this.shares = response.data;
        },
        error: (error: HttpErrorResponse) => {
          console.log('error', error.error);
        }
      });
  }

  getExpectations(): void{
    this.expectationService
      .getExpectations()
      .subscribe({
        next: (response) => {
          this.buildFormGroup(response.data);
          this.expectations = response.data;
        },
        error: (error: HttpErrorResponse) => {
          console.log('error', error.error);
        }
      });
  }

  getExpectationsByShareId(shareId: string): ExpectationInterface[] {
    return this.expectations.filter(exp => exp.shareId === shareId);
  }

  buildFormGroup(expectations: ExpectationInterface[]): any {
    expectations.forEach(expectation => {
      this.form.addControl(expectation.id, this.fb.control(0, Validators.pattern('[^0]+')));
    });
  }

  onSubmit(): void {
    if(this.form.invalid) {
      this.errorMessage = 'Informe todas as espectativas';
      return;
    }

    this.errorMessage = '';
    
    const request = this.buildRequest();

    this.saveExpectationsCompleted(request);
    
  }

  saveExpectationsCompleted(expectations: ExpectationsDoneRequest[]): void{
    this.expectationService
      .expectationsDone(expectations)
      .subscribe({
        next: (response) => {
          console.log('salvou');
        },
        error: (error: HttpErrorResponse) => {
          console.log('error', error.error);
        }
      });
  }

  buildRequest(): ExpectationsDoneRequest[] {
    return Object
      .keys(this.form.value)
      .map((key) => { 
        return { 
          result: this.form.value[key],
          expectationId: key,
          shareId: this.expectations.filter(exp => exp.id == key)[0].shareId
        } 
      });
  }
}