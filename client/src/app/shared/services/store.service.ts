import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { Session } from '../models/session';
import { Subject } from '../models/subject';
import { Test } from '../models/test';
import { StateService } from './state.service';

interface StoreState {
  currentUser: string;
  currentUserId: string;
  currentCourse: Course;
  currentSubject: Subject;
  currentSession: Session;
  currentTest: Test;
  currentQuestionId: string;

  currentTestHistory: Test;
  chatUserList: Array<any>;

  responseEventType: string;
  responseProgress: number;
  currentRoleId: string;
  currentRoleName: string;
  isLoading: boolean;
  isPreloading: boolean;
  notifType: string;
  responseMsg: string;
}
const initialState: StoreState = {
  isPreloading: true,
  chatUserList: undefined,
  responseProgress: undefined,
  responseEventType: undefined,
  currentUser: undefined,
  currentUserId: undefined,
  currentCourse: undefined,
  currentSubject: undefined,
  currentSession: undefined,
  currentTest: undefined,
  currentTestHistory: undefined,
  currentQuestionId: undefined,
  currentRoleId: undefined,
  currentRoleName: undefined,
  isLoading: false,
  responseMsg: '',
  notifType: '',
};
@Injectable({
  providedIn: 'root',
})
export class StoreService extends StateService<StoreState> {
  constructor() {
    super(initialState);
  }

  $isLoading: Observable<boolean> = this.select((state) => state.isLoading);

  $currentUser: Observable<string> = this.select((state) => state.currentUser);

  $currentUserId: Observable<string> = this.select(
    (state) => state.currentUserId
  );

  $currentCourse: Observable<Course> = this.select(
    (state) => state.currentCourse
  );

  $currentSession: Observable<Session> = this.select(
    (state) => state.currentSession
  );

  $currentTest: Observable<Test> = this.select((state) => state.currentTest);

  $currentTestHistory: Observable<Test> = this.select(
    (state) => state.currentTestHistory
  );

  $chatUserList: Observable<Array<any>> = this.select(
    (state) => state.chatUserList
  );

  $currentQuestionId: Observable<string> = this.select(
    (state) => state.currentQuestionId
  );

  $currentRoleName: Observable<string> = this.select(
    (state) => state.currentRoleName
  );
  $responseProgress: Observable<number> = this.select(
    (state) => state.responseProgress
  );

  $responseEventType: Observable<string> = this.select(
    (state) => state.responseEventType
  );

  confirmDialog(msg: string) {
    if (msg != '') {
      return confirm(`<b>${msg}</b>`, 'Confirm changes');
    }
    return confirm(`<b>Are you sure?</b>`, 'Confirm changes');
  }

  setIsLoading(_isLoading: boolean) {
    this.setState({ isLoading: _isLoading });
  }

  setIsPreloading(_isPreloading: boolean) {
    this.setState({ isPreloading: _isPreloading });
  }

  setResponseMsg(message: string) {
    this.setState({ responseMsg: message });
  }

  setResponseProgress(progress: number) {
    this.setState({ responseProgress: progress });
  }

  setCurrentUser(name: string) {
    this.setState({ currentUser: name });
  }

  setCurrentUserId(id: string) {
    this.setState({ currentUserId: id });
  }

  setCurrentCourse(course: Course) {
    this.setState({ currentCourse: course });
  }

  setCurrentSubject(subject: Subject) {
    this.setState({ currentSubject: subject });
  }

  setCurrentSession(session: Session) {
    this.setState({ currentSession: session });
  }

  setCurrentTest(test: Test) {
    this.setState({ currentTest: test });
  }

  setCurrentTestHistory(test: Test) {
    this.setState({ currentTestHistory: test });
  }

  setCurrentQuestionId(id: string) {
    this.setState({ currentQuestionId: id });
  }

  setCurrentUserRoleId(id: string) {
    this.setState({ currentRoleId: id });
  }

  setCurrentUserRoleName(role: string) {
    this.setState({ currentRoleName: role });
  }

  setChatUserList(list: Array<any>) {
    this.setState({ chatUserList: list });
  }

  showNotif(message: string, type: string) {
    notify({ message: message, width: 150, displayTime: 1000 }, type);
    this.setResponseMsg(message);
  }
}
