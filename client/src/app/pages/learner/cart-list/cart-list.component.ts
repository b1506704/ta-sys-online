import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/models/cart';
import { CartStore } from 'src/app/shared/services/cart/cart-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { DxScrollViewComponent } from 'devextreme-angular';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  scrollView: DxScrollViewComponent;
  cartList!: Cart;
  currency: string = '$';
  courseData: Course;
  userId: string;
  isDetailPopupVisible: boolean = false;
  currentCourseID!: string;
  currentUserAccountId: string;

  constructor(
    private cartStore: CartStore,
    private store: StoreService,
    private router: Router
  ) {}

  getUserID() {
    return this.store.$currentUserId.subscribe((data: string) => {
      if (data) {
        this.userId = data;
      }
    });
  }

  selectCourse(_id: string) {
    this.currentCourseID = _id;
    console.log('SELECTED ID');
    console.log(_id);
    this.isDetailPopupVisible = true;
  }

  removeAllCourse() {
    this.cartStore.removeAllFromCart(this.userId);
  }

  removeCourse(course: Course) {
    this.cartStore.removeFromCart(course, this.userId);
  }

  navigateToSubject() {
    this.router.navigate(['/subject_list']);
  }

  sourceDataListener() {
    return this.cartStore.$cartInstance.subscribe((data: any) => {
      this.cartList = data;
      this.currentUserAccountId = data.userAccountId;
      console.log(data);
    });
  }

  scrollTop() {
    this.scrollView.instance.scrollTo({ top: 0, left: 0 });
  }

  initData() {
    this.getUserID();
    this.cartStore.getCart(this.userId).then(() => {
      this.sourceDataListener();
    });
  }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.sourceDataListener().unsubscribe();
  }
}
