import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message';
import { Course } from '../models/course';
import { Question } from '../models/question';
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

  currentTestHistory: Test;
  messageList: Array<ChatMessage>;
  assetList: Array<any>;
  quizList: Array<any>;

  blackBoard: Array<any>;
  resultBoard: Array<any>;

  operationFlag: any;

  savedQuestions: Array<Question>;
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
  currentSubject: undefined,
  currentSession: undefined,
  currentTest: undefined,
  currentTestHistory: undefined,
  savedQuestions: undefined,
  messageList: undefined,
  assetList: undefined,
  quizList: undefined,
  blackBoard: undefined,
  resultBoard: undefined,
  operationFlag: undefined,
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

  $currentSubject: Observable<Subject> = this.select(
    (state) => state.currentSubject
  );

  $currentSession: Observable<Session> = this.select(
    (state) => state.currentSession
  );

  $currentTest: Observable<Test> = this.select((state) => state.currentTest);

  $currentTestHistory: Observable<Test> = this.select(
    (state) => state.currentTestHistory
  );

  $savedQuestions: Observable<Array<Question>> = this.select(
    (state) => state.savedQuestions
  );

  $blackBoard: Observable<Array<any>> = this.select(
    (state) => state.blackBoard
  );

  $assetList: Observable<Array<any>> = this.select((state) => state.assetList);

  $resultBoard: Observable<Array<any>> = this.select(
    (state) => state.resultBoard
  );

  $quizList: Observable<Array<any>> = this.select((state) => state.quizList);

  $messageList: Observable<Array<ChatMessage>> = this.select(
    (state) => state.messageList
  );

  $operationFlag: Observable<any> = this.select((state) => state.operationFlag);

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

  confirmDialog(msg: string) {
    if (msg != '') {
      return confirm(`<b>${msg}</b>`, 'Confirm changes');
    }
    return confirm(`<b>Are you sure?</b>`, 'Confirm changes');
  }

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

  setSavedQuestion(listQuestion: Array<Question>) {
    this.setState({ savedQuestions: listQuestion });
  }

  setCurrentUserRoleId(id: string) {
    this.setState({ currentRoleId: id });
  }

  setCurrentUserRoleName(role: string) {
    this.setState({ currentRoleName: role });
  }

  setBlackboard(item: any) {
    this.setState({ blackBoard: item });
  }

  setResultBoard(item: any) {
    this.setState({ resultBoard: item });
  }

  setQuizList(item: any) {
    this.setState({ quizList: item });
  }

  setAssetList(item: any) {
    this.setState({ assetList: item });
  }

  setMessageList(item: any) {
    this.setState({ messageList: item });
  }

  setOperationFlag(item: any) {
    this.setState({ operationFlag: item });
  }

  showNotif(message: string, type: string) {
    notify({ message: message, width: 150, displayTime: 1000 }, type);
    this.setResponseMsg(message);
  }
}
