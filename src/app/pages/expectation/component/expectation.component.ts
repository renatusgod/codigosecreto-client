import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
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

  constructor(
    private shareService: ShareService,
    private expectationService: ExpectationService,
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
}