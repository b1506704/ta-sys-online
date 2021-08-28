import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LearnerStore } from 'src/app/shared/services/learner/learner-store.service';
import { InstructorStore } from 'src/app/shared/services/instructor/instructor-store.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  pageSize: number = 50;
  currentIndexFromServer: number;

  constructor(
    private learnerStore: LearnerStore,
    private instructorStore: InstructorStore,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  loadMoreData() {
    this.learnerStore.loadDataAsync(
      this.currentIndexFromServer + 1,
      this.pageSize
    );
    this.instructorStore.loadDataAsync(
      this.currentIndexFromServer + 1,
      this.pageSize
    );
  }

  toLearner() {
    this.router.navigate(['learner'], { relativeTo: this.route });
  }

  toInstructor() {
    this.router.navigate(['instructor'], { relativeTo: this.route });
  }

  navigateToEditUser() {
    this.router.navigate(['/edit_user_list']);
  }

  currentPageListener() {
    return this.learnerStore.$currentPage.subscribe((data: any) => {
      this.currentIndexFromServer = data;
    });
  }

  ngOnInit(): void {
    this.currentPageListener();
  }

  ngOnDestroy(): void {
    this.currentPageListener().unsubscribe();
  }
}
