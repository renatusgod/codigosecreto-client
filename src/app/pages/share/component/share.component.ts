import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ExpectationInterface } from "src/app/shared/models/expectation.interface";
import { ShareInterface } from "src/app/shared/models/share.interface";
import { ExpectationService } from "src/app/shared/services/expectation.service";
import { ShareService } from "src/app/shared/services/share.service";

@Component({
  selector: 'share',
  templateUrl: './share.component.html'
})
export class ShareComponent implements OnInit{
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

  createShare(title: string): void {
    this.shareService
      .createShare(title)
      .subscribe({
        next: (response) => {
          this.shares = [...this.shares, response.data];
        },
        error: (error: HttpErrorResponse) => {
          console.log('error', error.error);
        }
      });
  }

  createExpectation(description: string, shareId: string): void {
    this.expectationService
      .createExpectation(description, shareId)
      .subscribe({
        next: (response) => {
          this.expectations = [...this.expectations, response.data];
        },
        error: (error: HttpErrorResponse) => {
          console.log('error', error.error);
        }
      });
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