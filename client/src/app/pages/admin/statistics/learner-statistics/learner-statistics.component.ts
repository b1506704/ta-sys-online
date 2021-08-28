import { Component, OnDestroy, OnInit } from '@angular/core';
import { Learner } from 'src/app/shared/models/learner';
import { LearnerStore } from 'src/app/shared/services/learner/learner-store.service';
import { ScreenService } from 'src/app/shared/services/screen.service';

@Component({
  selector: 'app-learner-statistics',
  templateUrl: './learner-statistics.component.html',
  styleUrls: ['./learner-statistics.component.scss'],
})
export class LearnerStatisticsComponent implements OnInit, OnDestroy {
  barChartTitle: string = 'Learner By Blood Type';
  barChartSubtitle: string = 'B.Type Category';
  funnelChartTitle: string = 'Learner By Occupation';
  funnelChartSubtitle: string = 'Job count';
  lineChartTitle: string = 'Learner By Age';
  lineChartSubtitle: string = 'Height and Weight';
  polarChartTitle: string = 'Learner By Virus Test';
  polarChartSubtitle: string = 'Positive Virus Test';
  pieChartTitle: string = 'Learner By Gender';
  pieChartSubtitle: string = 'Total Male/Female Percentage';
  loadingIndicator: Object = {
    enabled: true,
    backgroundColor: 'white',
    font: { color: 'white', family: 'hero', size: '50px', weight: 'bold' },
  };
  visualLineRange: any = {};
  visualPolarRange: any = {};
  zoomingData: Array<any>;
  learnerList!: Array<Learner>;
  barChartSource: Array<Object> = [
    {
      bloodType: '',
      totalCount: '',
    },
  ];
  funnelChartSource: Array<Object> = [
    {
      job: '',
      totalCount: '',
    },
  ];
  pieChartSource: Array<Object> = [
    {
      gender: '',
      totalCount: '',
    },
  ];
  chartHeight: any = 610;
  chartWidth: any = 610;

  constructor(
    private learnerStore: LearnerStore,
    private screen: ScreenService
  ) {}

  customizeTooltip = (info: any) => {
    return {
      html:
        "<div><div class='tooltip-header'>" +
        `Age: ${info.argumentText}` +
        '</div>' +
        "<div class='tooltip-body'><div class='series-name'>" +
        "<span class='top-series-name'>" +
        info.points[0].seriesName +
        '</span>' +
        ": </div><div class='value-text'>" +
        "<span class='top-series-value'>" +
        info.points[0].valueText +
        '</span>' +
        "</div><div class='series-name'>" +
        "<span class='bottom-series-name'>" +
        info.points[1].seriesName +
        '</span>' +
        ": </div><div class='value-text'>" +
        "<span class='bottom-series-value'>" +
        info.points[1].valueText +
        '</span>' +
        '</div></div></div>',
    };
  };

  onPointClick(e: any) {
    e.target.select();
  }

  customizeLabel(arg) {
    return arg.valueText + ' (' + arg.percentText + ')';
  }

  barChartSourceListener() {
    this.learnerStore.getBloodTypeStatistics();
    return this.learnerStore.$bloodTypeStatistics.subscribe((data: any) => {
      this.barChartSource = data;
    });
  }

  funnelChartSourceListener() {
    this.learnerStore.getJobStatistics();
    return this.learnerStore.$jobStatistics.subscribe((data: any) => {
      this.funnelChartSource = data;
    });
  }

  pieChartSourceListener() {
    this.learnerStore.getGenderStatistics();
    return this.learnerStore.$genderStatistics.subscribe((data: any) => {
      this.pieChartSource = data;
    });
  }

  sourceDataListener() {
    return this.learnerStore.$learnerList.subscribe((data: any) => {
      this.learnerList = data;
    });
  }

  ngOnInit(): void {
    const isXSmall = this.screen.sizes['screen-x-small'];
    console.log('SCREEN XSMALL');
    console.log(isXSmall);
    if (isXSmall === true) {
      this.chartHeight = 310;
      this.chartWidth = 310;
    } else {
      this.chartHeight = 600;
      this.chartWidth = 600;
    }
    this.barChartSourceListener();
    this.funnelChartSourceListener();
    this.pieChartSourceListener();
    this.sourceDataListener();
    setTimeout(() => {
      this.learnerStore.initData(0, 50);
    }, 150);
  }

  ngOnDestroy(): void {
    this.sourceDataListener().unsubscribe();
    this.funnelChartSourceListener().unsubscribe();
    this.barChartSourceListener().unsubscribe();
    this.pieChartSourceListener().unsubscribe();
  }
}
