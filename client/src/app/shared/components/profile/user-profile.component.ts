import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { User } from '../../models/user';
import { DxFormComponent } from 'devextreme-angular';
import { LearnerStore } from '../../services/learner/learner-store.service';
import { InstructorStore } from '../../services/instructor/instructor-store.service';
import { Learner } from '../../models/learner';
import { ImageStore } from '../../services/image/image-store.service';
import { Image } from '../../models/image';
@Component({
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  submitButtonOptions: any = {
    text: 'Submit',
    icon: 'save',
    type: 'normal',
    useSubmitBehavior: true,
  };
  resetButtonOptions: any = {
    text: 'Reset',
    icon: 'refresh',
    type: 'normal',
    useSubmitBehavior: false,
    onClick: () => {
      this.form.instance.resetValues();
      this.form.instance.getEditor('userName').focus();
    },
  };
  submitLearnerButtonOptions: any = {
    text: 'Submit',
    icon: 'save',
    type: 'normal',
    useSubmitBehavior: true,
  };
  resetLearnerButtonOptions: any = {
    text: 'Reset',
    icon: 'refresh',
    type: 'normal',
    useSubmitBehavior: false,
    onClick: () => {
      this.renderSourceData();
      this.imageData.url = '../../../../assets/imgs/profile.png';
    },
  };
  submitInstructorButtonOptions: any = {
    text: 'Submit',
    icon: 'save',
    type: 'normal',
    useSubmitBehavior: true,
  };
  resetInstructorButtonOptions: any = {
    text: 'Reset',
    icon: 'refresh',
    type: 'normal',
    useSubmitBehavior: false,
    onClick: () => {
      this.renderSourceData();
      this.imageData.url = '../../../../assets/imgs/profile.png';
    },
  };
  user!: any;
  learnerData!: Learner;
  instructorData!: any;
  currentUser!: User;
  currentRole!: string;
  imageData: Image = {
    sourceID: '',
    category: '',
    title: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    url: '../../../../assets/imgs/profile.png',
  };

  constructor(
    private store: StoreService,
    private learnerStore: LearnerStore,
    private instructorStore: InstructorStore,
    private imageStore: ImageStore
  ) {}

  onFormShown(e: any) {
    setTimeout(() => {
      this.form.instance.getEditor('userName').focus();
    }, 200);
  }

  onSubmit = (e: any) => {
    e.preventDefault();
  };

  onLearnerSubmit = (e: any) => {
    e.preventDefault();
    // this.imageData.sourceID = this.learnerData._id;
    // this.imageData.category = 'learner';
    // this.imageData.title = this.learnerData.fullName;
    // this.imageStore.uploadImage(this.imageData, 0, 5);
    this.learnerStore.updateLearner(
      this.learnerData,
      this.learnerData._id,
      0,
      5
    );
  };

  onInstructorSubmit = (e: any) => {
    e.preventDefault();
    // this.imageData.sourceID = this.instructorData._id;
    // this.imageData.category = 'instructor';
    // this.imageData.title = this.instructorData.fullName;
    // this.imageStore.uploadImage(this.imageData, 0, 5);
    this.instructorStore.updateInstructor(this.instructorData, this.instructorData._id, 0, 5);
  };

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    console.log(file);
    if (file !== undefined) {
      if (file.size <= 2000000) {
        this.imageData.fileSize = file.size;
        this.imageData.fileType = file.type;
        this.imageData.fileName = file.name;
        var pattern = /image-*/;
        var reader = new FileReader();

        if (!file.type.match(pattern)) {
          this.store.showNotif('Invalid format!', 'custom');
          return;
        }
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
      } else {
        this.store.showNotif('Image cannot exceed 2MB', 'custom');
      }
    }
  }

  handleReaderLoaded(e: any) {
    var reader = e.target;
    console.log('READER');
    console.log(reader);
    this.imageData.url = reader.result;
    console.log('SOURCE ID');
    console.log(this.imageData.sourceID);
  }

  userDataListener() {
    return this.store.$currentUser.subscribe((data: any) => {
      if (data !== null) {
        this.currentUser = data;
      }
    });
  }

  userRoleListener() {
    return this.store.$currentRole.subscribe((data: any) => {
      this.currentRole = data;
    });
  }

  learnerDataListener() {
    return this.learnerStore.$learnerInstance.subscribe((data: any) => {
      if (data !== undefined) {
        this.learnerData = data;
        this.imageStore.getImageBySourceID(data._id).then(() => {
          this.imageDataListener();
        });
      }
    });
  }

  instructorDataListener() {
    return this.instructorStore.$instructorInstance.subscribe((data: any) => {
      if (data !== undefined) {
        this.instructorData = data;
        this.imageStore.getImageBySourceID(data._id).then(() => {
          this.imageDataListener();
        });
      }
    });
  }

  imageDataListener() {
    return this.imageStore.$imageInstance.subscribe((data: any) => {
      if (data !== null) {
        console.log('IMAGE DATA');
        console.log(data);
        this.imageData = data;
      }
    });
  }

  renderSourceData() {
    this.user = this.currentUser;
    switch (this.currentRole) {
      case 'Learner':
        this.learnerStore
          .getLearnerByUserName(this.currentUser.userName)
          .then(() => {
            this.learnerDataListener();
          });
        this.user = {
          userName: this.user.userName,
          passWord: this.user.passWord,
          role: this.user.role,
        };
        break;
      case 'Instructor':
        this.instructorStore
          .getInstructorByUserName(this.currentUser.userName)
          .then(() => {
            this.instructorDataListener();
          });
        this.user = {
          userName: this.user.userName,
          passWord: this.user.passWord,
          role: this.user.role,
        };
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
    this.userDataListener();
    this.userRoleListener();
    this.renderSourceData();
  }

  ngOnDestroy(): void {
    this.userDataListener().unsubscribe();
    this.userRoleListener().unsubscribe();
    this.imageDataListener().unsubscribe();
  }
}
