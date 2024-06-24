import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import Chart from 'chart.js/auto';
import { ExpectativeIndexInterface } from "src/app/shared/models/expectative-index.interface";
import { ShareIndexInterface } from "src/app/shared/models/share-index.interface";
import { IndexsService } from "src/app/shared/services/index.service";

@Component({
  selector: 'market',
  templateUrl: './market.component.html'
})
export class MarketComponent {
  sharesIndex: ShareIndexInterface[] = [];
  expectativesIndex: ExpectativeIndexInterface[] = [];
  endAt: Date = new Date();
  startAt: Date = new Date;
  chartShare: any = [];
  chartExpectative: any = [];

  constructor(
    private indexService: IndexsService
  ) {
    this.startAt.setDate(this.startAt.getDate() - 7);
  }

  ngOnInit(): void {
    this.getSharesIndex();
    this.getExpectativesIndex();
  }

  getSharesIndex(): void{
    this.indexService
      .getShareIndexs(this.startAt, this.endAt)
      .subscribe({
        next: (response) => {
          this.sharesIndex = response.data;
          this.buildShareChart();
        },
        error: (error: HttpErrorResponse) => {
          console.log('error', error.error);
        }
      });
  }

  getExpectativesIndex(): void{
    this.indexService
      .getExpectativeIndexs(this.startAt, this.endAt)
      .subscribe({
        next: (response) => {
          this.expectativesIndex = response.data;
          this.buildExpectativeChart();
        },
        error: (error: HttpErrorResponse) => {
          console.log('error', error.error);
        }
      });
  }

  buildShareChart() {
    let shareIds: string[] = [];
    let shareIdBiggerLength = '';
    let shareLength = 0;

    this.sharesIndex.forEach(share => {
      if(!shareIds.includes(share.shareId))
        shareIds.push(share.shareId)

      const count = this.sharesIndex.filter(s => s.shareId === share.shareId).length;

      if(count > shareLength) {
        shareLength = count;
        shareIdBiggerLength = share.shareId;
      }
    });

    const labels = this.sharesIndex.filter(share => share.shareId === shareIdBiggerLength).map(share => 
      new Date(share.createdAt).toLocaleDateString('pt-br', { weekday: 'long' })
    );

    let shareData: any[] = [];

    shareIds.forEach(id => {
      shareData.push({
        label: this.sharesIndex.filter(share => share.shareId === id)[0].shareTitle,
        data: this.sharesIndex.filter(share => share.shareId === id).map(share => share.score),
        borderWidth: 1,
      });
    });    

    this.chartShare = new Chart('share', {
      type: 'line',
      data: {
        labels: labels,
        datasets: shareData
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  buildExpectativeChart() {
    this.chartShare = new Chart('expectative', {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
          {
            label: '# of jh',
            data: [2, 2, 32, 15, 21, 31],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}