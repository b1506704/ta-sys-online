import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { Session } from '../models/session';
import { StateService } from './state.service';

interface StoreState {
  currentUser: string;
  currentUserId: string;
  currentCourse: Course;

  currentSession: Session;
  responseList: Array<Object>;
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
  responseList: [],
  responseProgress: undefined,
  responseEventType: undefined,
  currentUser: undefined,
  currentUserId: undefined,
  currentCourse: undefined,
  currentSession: undefined,
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
    this.loadDataAsync();
  }

  $isLoading: Observable<boolean> = this.select((state) => state.isLoading);

  $isPreloading: Observable<boolean> = this.select(
    (state) => state.isPreloading
  );

  $responseMsg: Observable<string> = this.select((state) => state.responseMsg);

  $notifType: Observable<string> = this.select((state) => state.notifType);

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

  $currentRoleId: Observable<string> = this.select(
    (state) => state.currentRoleId
  );

  $currentRoleName: Observable<string> = this.select(
    (state) => state.currentRoleName
  );

  $responseList: Observable<Object> = this.select(
    (state) => state.responseList
  );

  $responseProgress: Observable<number> = this.select(
    (state) => state.responseProgress
  );

  $responseEventType: Observable<string> = this.select(
    (state) => state.responseEventType
  );

  loadDataAsync() {}

  setIsLoading(_isLoading: boolean) {
    this.setState({ isLoading: _isLoading });
  }

  setIsPreloading(_isPreloading: boolean) {
    this.setState({ isPreloading: _isPreloading });
  }

  setResponseMsg(message: string) {
    this.setState({ responseMsg: message });
  }

  setNotifType(type: string) {
    this.setState({ notifType: type });
  }

  setResponseProgress(progress: number) {
    this.setState({ responseProgress: progress });
  }

  setResponseEventType(eventType: string) {
    this.setState({ responseEventType: eventType });
  }
  //todo: manage response progress array

  addResponse(response: Object) {
    this.setState({ responseList: this.state.responseList.concat(response) });
  }

  removeResponse(id: any) {
    this.setState({
      responseList: this.state.responseList.filter((e: any) => e?.id === id),
    });
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

  setCurrentSession(session: Session) {
    this.setState({ currentSession: session });
  }

  setCurrentUserRoleId(id: string) {
    this.setState({ currentRoleId: id });
  }

  setCurrentUserRoleName(role: string) {
    this.setState({ currentRoleName: role });
  }

  showNotif(message: string, type: string) {
    notify({ message: message, width: 150, displayTime: 1000 }, type);
    this.setResponseMsg(message);
  }
}
