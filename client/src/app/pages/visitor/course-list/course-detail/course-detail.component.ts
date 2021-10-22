import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { CourseStore } from '../../../../shared/services/course/course-store.service';
import { File } from 'src/app/shared/models/file';
import { FileHttpService } from 'src/app/shared/services/file/file-http.service';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { BillStore } from 'src/app/shared/services/bill/bill-store.service';
import { UserStore } from 'src/app/shared/services/user/user-store.service';
@Component({
  selector: 'app-course-detail',
  templateUrl: 'course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() courseID!: string;
  courseData!: Course;
  fieldList: Array<Object> = [];
  currency: string = '$';
  fileData: File = {
    sourceID: '',
    container: '',
    category: '',
    title: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    url: '../../../../assets/imgs/profile.png',
  };
  payPalConfig?: IPayPalConfig;
  showSuccess: boolean;
  isLogin: boolean;
  constructor(
    private courseStore: CourseStore,
    private fileStore: FileStore,
    private userStore: UserStore,
    private billStore: BillStore
  ) {}

  courseDataListener() {
    return this.courseStore.$courseInstance.subscribe((data: any) => {
      this.courseData = data;
      this.initConfig();
    });
  }

  getUserMediaData(id: string) {
    this.fileStore.getFile(id).then((data: any) => {
      if (data !== null) {
        this.fileData = data.data[0];
      }
    });
  }

  renderSourceData() {
    this.courseData = null;
    this.fileData = {
      sourceID: '',
      container: '',
      category: '',
      title: '',
      fileName: '',
      fileSize: 0,
      fileType: '',
      url: '../../../../assets/imgs/profile.png',
    };
    // setTimeout(() => {
    // this.getUserMediaData(this.courseID);
    this.courseStore.getCourse(this.courseID).then(() => {
      this.courseDataListener();
    });
    // }, 100);
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
                value: this.courseData.cost.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.courseData.cost.toString(),
                  },
                },
              },
              items: [
                {
                  name: this.courseData.name,
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: this.courseData.cost.toString(),
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'false',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
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

  checkLogin() {
    return this.userStore.$isLoggedIn.subscribe((data: boolean) => {
      this.isLogin = data;
    });
  }

  showLoginPopup() {
    this.userStore.setIsShowLoginPopup(true);
  }

  ngOnInit(): void {
    this.checkLogin();
    // this.initConfig();
  }

  ngOnChanges(): void {
    this.renderSourceData();
  }

  ngOnDestroy(): void {
    this.courseDataListener().unsubscribe();
    this.checkLogin().unsubscribe();
  }
}
