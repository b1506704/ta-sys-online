import { Component, OnDestroy, OnInit } from '@angular/core';
import { Instructor } from 'src/app/shared/models/instructor';
import { InstructorStore } from 'src/app/shared/services/instructor/instructor-store.service';
import { ScreenService } from 'src/app/shared/services/screen.service';

@Component({
  selector: 'app-instructor-statistics',
  templateUrl: './instructor-statistics.component.html',
  styleUrls: ['./instructor-statistics.component.scss'],
})
export class InstructorStatisticsComponent implements OnInit, OnDestroy {
  barChartTitle: string = 'Instructor By Role';
  barChartSubtitle: string = 'Role Category';
  funnelChartTitle: string = 'Instructor By Department';
  funnelChartSubtitle: string = 'Department Summary';
  lineChartTitle: string = 'Instructor By Age';
  lineChartSubtitle: string = 'Years of Experience';
  polarChartTitle: string = 'Instructor By Virus Test';
  polarChartSubtitle: string = 'Positive Virus Test';
  pieChartTitle: string = 'Instructor By Gender';
  pieChartSubtitle: string = 'Total Male/Female Percentage';
  loadingIndicator: Object = {
    enabled: true,
    backgroundColor: 'white',
    font: { color: 'white', family: 'hero', size: '50px', weight: 'bold' },
  };
  visualLineRange: any = {};
  visualPolarRange: any = {};
  zoomingData: Array<any>;
  instructorList!: Array<Instructor>;
  barChartSource: Array<Object> = [
    {
      role: '',
      totalCount: '',
    },
  ];
  funnelChartSource: Array<Object> = [
    {
      department: '',
      totalCount: '',
    },
  ];
  pieChartSource: Array<Object> = [
    {
      gender: '',
      totalCount: '',
    },
  ];
  chartHeight: number | string = 500;
  chartWidth: number | string = 1000;

  constructor(
    private instructorStore: InstructorStore,
    private screen: ScreenService
  ) {}

  onPointClick(e: any) {
    e.target.select();
  }

  customizeLabel(arg) {
    return arg.valueText + ' (' + arg.percentText + ')';
  }

  barChartSourceListener() {
    this.instructorStore.getRoleStatistics();
    return this.instructorStore.$roleStatistics.subscribe((data: any) => {
      this.barChartSource = data;
    });
  }

  funnelChartSourceListener() {
    this.instructorStore.getDepartmentStatistics();
    return this.instructorStore.$departmentStatistics.subscribe((data: any) => {
      this.funnelChartSource = data;
    });
  }

  pieChartSourceListener() {
    this.instructorStore.getGenderStatistics();
    return this.instructorStore.$genderStatistics.subscribe((data: any) => {
      this.pieChartSource = data;
    });
  }

  sourceDataListener() {
    return this.instructorStore.$instructorList.subscribe((data: any) => {
      this.instructorList = data;
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
      this.instructorStore.initData(0, 50);
    }, 150);
  }

  ngOnDestroy(): void {
    this.sourceDataListener().unsubscribe();
    this.funnelChartSourceListener().unsubscribe();
    this.barChartSourceListener().unsubscribe();
    this.pieChartSourceListener().unsubscribe();
  }
}
