import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/models/cart';
import { CartStore } from 'src/app/shared/services/cart/cart-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { DxScrollViewComponent } from 'devextreme-angular';
import { Course } from 'src/app/shared/models/course';
import { PayCheck } from 'src/app/shared/models/pay-check';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { UserHttpService } from 'src/app/shared/services/user/user-http.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DxScrollViewComponent, { static: false })
  scrollView: DxScrollViewComponent;
  cartList!: Cart;
  currency: string = '$';
  courseData: Course;
  userId: string;
  isDetailPopupVisible: boolean = false;
  currentCourseID!: string;
  currentUserAccountId: string;
  isLogin: boolean;
  showSuccess: boolean;
  payPalConfig?: IPayPalConfig;

  constructor(
    private cartStore: CartStore,
    private store: StoreService,
    private router: Router,
    private userHTTP: UserHttpService
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
    this.cartStore.removeAllFromCart(this.userId).then((data: any) => {
      this.store.setIsLoading(false);
      this.store.showNotif(data.responseMessage, 'custom');
      this.initData();
    });
  }

  removeCourse(course: Course) {
    this.cartStore.removeFromCart(course, this.userId).then((data: any) => {
      this.store.setIsLoading(false);
      this.store.showNotif(data.responseMessage, 'custom');
      this.initData();
    });
  }

  navigateToClassroom() {
    this.router.navigate(['/learner_course']);
  }

  sourceDataListener() {
    return this.cartStore.$cartInstance.subscribe((data: any) => {
      this.cartList = data;
      this.currentUserAccountId = data.userAccountId;
      console.log(data);
      setTimeout(() => {
        this.initConfig();
      }, 500);
    });
  }

  scrollTop() {
    this.scrollView.instance.scrollTo({ top: 0, left: 0 });
  }

  submitBill() {   
    const payCheck: PayCheck = {
      userId: this.cartList.userAccountId,
      courseIds: this.cartList.courses.map((e: any) => e.id),
    };
    this.userHTTP.addToCourse(payCheck).subscribe((data: any) => {
      this.store.showNotif(data.responseMessage, 'custom');
      this.store
        .confirmDialog('Visit classroom now?')
        .then((confirm: boolean) => {
          if (confirm) {
            this.router.navigate(['learner_classroom']);
          }
        });
    });
  }

  initData() {
    this.getUserID();
    this.cartStore.getCart(this.userId).then(() => {
      this.sourceDataListener();
    });
  }

  initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'ASfFvJbPpYwF_4PlZ7WMC7tJ6-0rlQtvzOpz31TJ21g2BlXQ2oNfMHuiUKNy7UT7ofkynkQl5-k8VkCf',
      createOrderOnClient: (data: any) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.cartList.totalCost.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.cartList.totalCost.toString(),
                  },
                },
              },
              items: this.cartList.courses?.map((c: Course) => ({
                name: c.name,
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: c.cost.toString(),
                },
              })),
            },
          ],
        },
      advanced: {
        commit: 'false',
      },
      style: {
        label: 'paypal',
        layout: 'horizontal',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.showSuccess = true;
        this.submitBill();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  ngAfterViewInit(): void {
    // this.initConfig();
  }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.sourceDataListener().unsubscribe();
  }
}
