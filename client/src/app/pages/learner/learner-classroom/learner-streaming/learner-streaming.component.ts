import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SignalrService } from 'src/app/shared/services/streaming/signalr.service';
import { signalRConfig } from 'src/app/shared/services/streaming/signalr.config';
import { StoreService } from 'src/app/shared/services/store.service';
import { UserEntry } from 'src/app/shared/models/user-entry';
import { ChatMessage } from 'src/app/shared/models/chat-message';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { File } from 'src/app/shared/models/file';
import { Question } from 'src/app/shared/models/question';
import { Answer } from 'src/app/shared/models/answer';
import { DxScrollViewComponent } from 'devextreme-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { Subject } from 'src/app/shared/models/subject';
import { Session } from 'src/app/shared/models/session';
// import { DOCUMENT } from '@angular/common';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Router } from '@angular/router';
@Component({
  templateUrl: 'learner-streaming.component.html',
  styleUrls: ['./learner-streaming.component.scss'],
})
export class LearnerStreamingComponent implements OnInit, OnDestroy {
  @ViewChild('localVideo') localVideo: ElementRef;
  @ViewChild('remoteVideo') remoteVideo: ElementRef;
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  // @ViewChild(DxTextBoxComponent, { static: false })
  // dxTextBox: DxTextBoxComponent;
  localStream: MediaStream;
  remoteStream: MediaStream;
  @ViewChild('feature1', { static: true }) feature1: ElementRef<HTMLDivElement>;

  room: any = {
    name: '',
  };
  submitRoomButtonOptions: any = {
    text: 'Submit',
    icon: 'save',
    type: 'normal',
    useSubmitBehavior: true,
  };
  peerConnection: RTCPeerConnection;

  isInitiator: boolean;
  isChannelReady: boolean;
  isStarted: boolean;
  isPopupChatVisible: boolean;
  isPopupLessonVisible: boolean;
  isPopupTestVisible: boolean;
  isPopupSettingVisible: boolean;
  isPopupVideoVisible: boolean;
  isShowingLesson: boolean = false;
  isShowingQuestion: boolean = false;
  isShowingAnswer: boolean = false;
  isShowingCorrectAnswer: boolean = false;
  isShowingResult: boolean = false;
  isPresenting: boolean = false;
  selectedPresenter!: UserEntry;
  selectedTestId: string = '';
  selectedQuestion!: any;
  receiveChatUserEntry!: UserEntry;

  userEntry: UserEntry = {
    id: '',
    displayName: '',
  };
  currentCourseId: string;

  chatUserList: Array<UserEntry> = [];

  // chatUserList: Array<UserEntry> = [
  //   { id: '0d0ea585-e59f-4a79-76a4-08d9abdd6f9a', displayName: 'N.H.Hoa' },
  //   { id: '1', displayName: 'N.H.Hoa' },
  //   { id: '1', displayName: 'N.H.Hoa' },
  //   { id: '1', displayName: 'N.H.Hoa' },
  //   { id: '1', displayName: 'N.H.Hoa' },
  //   { id: '1', displayName: 'N.H.Hoa' },
  //   { id: '1', displayName: 'N.H.Hoa' },
  //   { id: '1', displayName: 'N.H.Hoa' },
  //   { id: '1', displayName: 'N.H.Hoa' },
  //   { id: '1', displayName: 'N.H.Hoa' },
  // ];
  messageList: Array<ChatMessage> = [];
  assetList: Array<any> = [];
  quizList: Array<any> = [];
  blackBoard: Array<any> = [];
  resultBoard: Array<any> = [];

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

  currentUserImg: File = {
    sourceID: '',
    container: '',
    category: '',
    title: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    url: '../../../../assets/imgs/profile.png',
  };
  fileList: Array<File> = [];
  courseData!: Course;
  creatorData!: any;
  subjectData!: Subject;
  streamSessionData!: any;

  constructor(
    private signaling: SignalrService,
    private store: StoreService,
    private router: Router,
    private fileStore: FileStore
  ) {}

  getLatestBlackboard() {
    if (this.isShowingQuestion) {
      this.signaling.invoke('GetQuestion', this.room.name);
      this.store.showNotif('Fetching data', 'custom');
    }
    if (this.isShowingLesson)
      this.signaling.invoke('GetLesson', this.room.name);
    if (this.isShowingResult)
      this.signaling.invoke('GetTestResult', this.room.name);
  }

  getOperationFlag(data: any) {
    this.isShowingLesson = data.isShowingLesson;
    this.isShowingQuestion = data.isShowingQuestion;
    this.isShowingAnswer = data.isShowingAnswer;
    this.isShowingCorrectAnswer = data.isShowingCorrectAnswer;
    this.isShowingResult = data.isShowingResult;
    console.log('CURRENT FLAG');
    console.log(data);
    this.store.showNotif('Fetching data', 'custom');
  }

  setOperationFlag() {
    const operationFlag = {
      isShowingLesson: this.isShowingLesson,
      isShowingQuestion: this.isShowingQuestion,
      isShowingAnswer: this.isShowingAnswer,
      isShowingCorrectAnswer: this.isShowingCorrectAnswer,
      isShowingResult: this.isShowingResult,
    };
    this.signaling.invoke('SetOperationFlag', this.room.name, operationFlag);
  }

  getMetaData() {
    return this.store.$currentSession.subscribe((data: Session) => {
      if (data) {
        this.streamSessionData = data;
        this.currentCourseId = data.courseId;
        this.courseData = data.courseTable;
        this.creatorData = data.creator;
        this.room.name = `R${this.courseData.name[0]}${
          this.creatorData.displayName[0]
        }${data.id[0] + data.id[1]}`.toUpperCase();
      }
    });
  }

  openPopupVideo() {
    this.isPopupVideoVisible = true;
  }

  openPopupChat() {
    this.isPopupChatVisible = true;
  }

  openPopupSetting() {
    this.isPopupSettingVisible = true;
  }

  closePopupSetting = () => {
    this.isPopupSettingVisible = false;
  };

  closePopupVideo = () => {
    this.isPopupVideoVisible = false;
  };

  closePopupChat = () => {
    this.isPopupChatVisible = false;
  };

  getUserMediaData(id: string) {
    this.fileStore.getFile(id).then((data: any) => {
      if (data !== null) {
        this.currentUserImg = data.data[0];
      }
    });
  }
  getUserID() {
    return this.store.$currentUserId.subscribe((data: string) => {
      if (data) {
        this.userEntry.id = data;
        this.getUserMediaData(this.userEntry.id);
      }
    });
  }

  getDisplayName() {
    return this.store.$currentUser.subscribe((data: string) => {
      if (data) {
        this.userEntry.displayName = data;
      }
    });
  }

  mapFileListToUrl(_id: string) {
    if (this.fileList.length !== 0) {
      const fetchedFile = this.fileList.find(
        (e: any) => e.sourceID === _id
      )?.url;
      if (fetchedFile) {
        return fetchedFile;
      } else {
        return this.fileData.url;
      }
    }
    return this.fileData.url;
  }

  fileDataListener() {
    return this.fileStore.$fileList.subscribe((data: any) => {
      if (data.length !== 0) {
        this.fileList = data;
      }
    });
  }

  fetchMediaBySourceID(sourceIDs: Array<any>) {
    const sourceIds = sourceIDs.map((e: any) => e.id);
    this.fileStore.getFiles(sourceIds);
  }

  submitAnswer(obj: { q: Question; e: Answer }) {
    const mapAnswerRequest = {
      id: obj.e.id,
      content: obj.e.content,
      isCorrect: obj.e.isCorrect,
      questionId: obj.e.questionId,
    };
    const questionWithAnswerChoice = {
      id: obj.q.id,
      content: obj.q.content,
      score: obj.q.score,
      totalCorrectAnswer: obj.q.totalCorrectAnswer,
      testId: obj.q.testId,
      answerRequests: [mapAnswerRequest],
    };
    const doTestRequest = {
      testId: obj.q.testId,
      userId: this.userEntry.id,
      questionRequest: [questionWithAnswerChoice],
    };
    console.log(doTestRequest);
    this.signaling.invoke('DoTest', this.room.name, doTestRequest);
    this.isShowingResult = true;
    this.setOperationFlag();
  }

  clearBoard() {
    this.blackBoard = [];
  }

  sendMessage = (message: any) => {
    const newMessage = {
      userEntry: this.userEntry,
      message: message,
      date: new Date().toLocaleTimeString(),
    };
    this.messageList = this.messageList.concat(newMessage);
    this.signaling.invoke(
      'SendMessage',
      message,
      this.room.name,
      this.userEntry
    );
  };

  sendPrivateMessage = (message: string) => {
    const newMessage = {
      userEntry: this.userEntry,
      message: message,
      date: new Date().toLocaleTimeString(),
    };
    this.messageList = this.messageList.concat(newMessage);
    this.signaling.invoke(
      'SendPrivateMessage',
      this.room.name,
      this.userEntry,
      this.receiveChatUserEntry,
      message
    );
  };

  privateMessage(receiveUserEntry: UserEntry) {
    this.store.showNotif(
      `Invited ${receiveUserEntry.displayName} for private chat`,
      'custom'
    );
    this.signaling.invoke(
      'SendPrivateMessage',
      this.room.name,
      this.userEntry,
      receiveUserEntry,
      'test message'
    );
  }

  ngOnInit(): void {
    this.getMetaData();
    this.fileDataListener();
    this.getUserID();
    this.getDisplayName();
    if (this.currentCourseId) {
      this.signaling.connect('/auth', false).then(() => {
        if (this.signaling.isConnected()) {
          this.signaling.invoke('Authorize').then((token: string) => {
            if (token) {
              sessionStorage.setItem('token', token);
              this.start();
            }
          });
        }
      });
    }
  }

  start(): void {
    // #1 connect to signaling server
    this.signaling.connect('/streaming', true).then(() => {
      if (this.signaling.isConnected()) {
        this.signaling.invoke(
          'CreateOrJoinRoom',
          this.room.name,
          this.userEntry
        );
      }
    });

    // #2 define signaling communication
    this.defineSignaling();

    // this.signaling.invoke('GetOperationFlag', this.room.name).then(() => {
    //   this.signaling.define('operationFlag', (flag: any) => {
    //     this.getOperationFlag(flag);
    //     setTimeout(() => {
    //       this.getLatestBlackboard();
    //     }, 500);
    //     console.log(flag);
    //   });
    // });
    this.openPopupVideo();

    // #3 get media from current client
    this.getUserMedia();
  }

  defineSignaling(): void {
    this.signaling.define('log', (message: any) => {
      console.log(message);
    });

    this.signaling.define('created', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
      this.chatUserList = userEntryList;
      this.isInitiator = true;
      this.fetchMediaBySourceID(userEntryList.map((e: any) => e.id));
    });

    this.signaling.define('joined', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
      this.chatUserList = userEntryList;
      this.isChannelReady = true;
      this.fetchMediaBySourceID(userEntryList.map((e: any) => e.id));
    });

    this.signaling.define('left', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
      this.chatUserList = userEntryList;
      this.fetchMediaBySourceID(userEntryList.map((e: any) => e.id));
    });

    this.signaling.define('isShowAnswerChoice', (isShow: boolean) => {
      this.isShowingAnswer = isShow;
    });

    this.signaling.define('isShowCorrectAnswer', (isShow: boolean) => {
      this.isShowingCorrectAnswer = isShow;
    });

    this.signaling.define('lesson', (list: any) => {
      this.isShowingQuestion = false;
      this.isShowingLesson = true;
      this.isShowingAnswer = false;
      this.isShowingCorrectAnswer = false;
      this.isShowingResult = false;
      this.blackBoard = list;
      console.log(this.blackBoard);
      this.fetchMediaBySourceID(list);
    });

    this.signaling.define('test', (list: Array<any>) => {
      // this.isShowingQuestion = false;
      this.isShowingLesson = false;
      // this.isShowingAnswer = true;
      // this.isShowingCorrectAnswer = true;
      this.isShowingResult = true;
      console.log(list);
      this.resultBoard = list;
      const displayName = list[list.length].userAccountResponse.displayName;
      this.store.showNotif(`${displayName} has submitted an answer`, 'custom');

      this.fetchMediaBySourceID(list.map((e: any) => e.userAccountResponse.id));
      this.dxScrollView.instance.scrollBy(150);
    });

    this.signaling.define('question', (question: any) => {
      this.isShowingQuestion = true;
      this.isShowingLesson = false;
      this.isShowingAnswer = false;
      this.isShowingCorrectAnswer = false;
      this.isShowingResult = false;
      console.log(question);
      this.clearBoard();

      this.blackBoard.push(question);
      console.log(this.blackBoard);
      this.fetchMediaBySourceID([question]);
    });

    this.signaling.define(
      'message',
      (chatMessage: any, userEntry: any, date: any) => {
        const message: ChatMessage = {
          userEntry: userEntry,
          message: chatMessage,
          date: date,
        };
        // console.log(message);
        this.messageList = this.messageList.concat(message);
        this.isPopupChatVisible = true;
        // console.log(this.messageList);
        if (chatMessage == 'got user media') {
          this.initiateCall();
        } else if (chatMessage.type == 'offer') {
          if (!this.isStarted) {
            this.initiateCall();
          }
          this.peerConnection.setRemoteDescription(
            new RTCSessionDescription(chatMessage)
          );
          this.sendAnswer();
        } else if (chatMessage.type == 'answer' && this.isStarted) {
          this.peerConnection.setRemoteDescription(
            new RTCSessionDescription(chatMessage)
          );
        } else if (chatMessage.type == 'candidate' && this.isStarted) {
          this.addIceCandidate(chatMessage);
        } else if (chatMessage == 'bye' && this.isStarted) {
          this.handleRemoteHangup();
        }
      }
    );

    this.signaling.define('presenting', (userEntry: any, isPresenting: any) => {
      this.isPresenting = isPresenting;
      console.log(userEntry);
      this.selectedPresenter = userEntry;
      if (isPresenting === true) {
        this.store.showNotif(
          `${userEntry.displayName} is presenting`,
          'custom'
        );
        this.getDisplayMedia();
      } else {
        this.store.showNotif(
          `${userEntry.displayName} has stopped presenting`,
          'custom'
        );
      }
    });

    this.signaling.define(
      'privateMessage',
      (
        sendUserEntry: any,
        receiveUserEntry: any,
        chatMessage: any,
        date: any
      ) => {
        if (receiveUserEntry.id === this.userEntry.id) {
          const message: ChatMessage = {
            userEntry: sendUserEntry,
            message: chatMessage,
            date: date,
          };
          this.store.showNotif(chatMessage, 'custom');
          // console.log(message);
          // this.messageList = this.messageList.concat(message);
          // this.isPopupChatVisible = true;
          // console.log(this.messageList);
        }
      }
    );
  }

  getUserMedia(): void {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream: MediaStream) => {
        this.addLocalStream(stream);
        this.sendMessage('got user media');
        if (this.isInitiator) {
          this.initiateCall();
        }
      })
      .catch((e) => {
        alert('getUserMedia() error: ' + e.name + ': ' + e.message);
      });
  }

  getDisplayMedia(): void {
    const mediaDevices = navigator.mediaDevices as any;
    const stream = mediaDevices
      .getDisplayMedia({ audio: true, video: true })
      .then((stream: MediaStream) => {
        this.addLocalStream(stream);
        this.sendMessage('got user media');
        if (this.isInitiator) {
          this.initiateCall();
        }
      })
      .catch((e: any) => {
        alert('getUserMedia() error: ' + e.name + ': ' + e.message);
      });
  }

  initiateCall(): void {
    this.store.showNotif('Initiating a call', 'custom');
    console.log('Initiating a call.');
    if (!this.isStarted && this.localStream && this.isChannelReady) {
      this.createPeerConnection();

      this.peerConnection.addTrack(
        this.localStream.getVideoTracks()[0],
        this.localStream
      );
      this.peerConnection.addTrack(
        this.localStream.getAudioTracks()[0],
        this.localStream
      );

      this.isStarted = true;
      if (this.isInitiator) {
        this.sendOffer();
      }
    }
  }

  createPeerConnection(): void {
    console.log('Creating peer connection.');
    this.store.showNotif('Creating peer connection.', 'custom');
    try {
      this.peerConnection = new RTCPeerConnection({
        iceServers: signalRConfig.iceServers,
        sdpSemantics: 'unified-plan',
      } as RTCConfiguration);

      this.peerConnection.onicecandidate = (
        event: RTCPeerConnectionIceEvent
      ) => {
        if (event.candidate) {
          this.sendIceCandidate(event);
        } else {
          console.log('End of candidates.');
        }
      };

      this.peerConnection.ontrack = (event: RTCTrackEvent) => {
        if (event.streams[0]) {
          this.addRemoteStream(event.streams[0]);
        }
      };
    } catch (e) {
      console.log('Failed to create PeerConnection.', e.message);
      return;
    }
  }

  sendOffer(): void {
    console.log('Sending offer to peer.');
    this.addTransceivers();
    this.peerConnection.createOffer().then((sdp: RTCSessionDescriptionInit) => {
      this.peerConnection.setLocalDescription(sdp);
      // console.log(sdp.sdp);
      this.sendMessage(sdp);
    });
  }

  sendAnswer(): void {
    console.log('Sending answer to peer.');
    this.addTransceivers();
    this.peerConnection.createAnswer().then((sdp: RTCSessionDescription) => {
      this.peerConnection.setLocalDescription(sdp);
      this.sendMessage(sdp);
    });
  }

  addIceCandidate(message: any): void {
    console.log('Adding ice candidate.');
    const candidate = new RTCIceCandidate({
      sdpMLineIndex: message.label,
      candidate: message.candidate,
    });
    this.peerConnection.addIceCandidate(candidate);
  }

  sendIceCandidate(event: RTCPeerConnectionIceEvent): void {
    console.log('Sending ice candidate to remote peer.');
    this.sendMessage({
      type: 'candidate',
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate,
    });
  }

  addTransceivers(): void {
    console.log('Adding transceivers.');
    const init = {
      direction: 'recvonly',
      streams: [],
      sendEncodings: [],
    } as RTCRtpTransceiverInit;
    this.peerConnection.addTransceiver('audio', init);
    this.peerConnection.addTransceiver('video', init);
  }

  addLocalStream(stream: MediaStream): void {
    console.log('Local stream added.');
    this.localStream = stream;
    this.localVideo.nativeElement.srcObject = this.localStream;
    this.localVideo.nativeElement.muted = 'muted';
  }

  addRemoteStream(stream: MediaStream): void {
    console.log('Remote stream added.');
    this.remoteStream = stream;
    this.remoteVideo.nativeElement.srcObject = this.remoteStream;
    this.remoteVideo.nativeElement.muted = 'muted';
  }

  hangup(): void {
    this.store
      .confirmDialog('Do you want to disconnect?')
      .then((confirm: boolean) => {
        if (confirm) {
          if (this.localStream && this.localStream.active) {
            this.localStream.getTracks().forEach((track) => {
              track.stop();
            });
          }
          if (this.remoteStream && this.remoteStream.active) {
            this.remoteStream.getTracks().forEach((track) => {
              track.stop();
            });
          }
          console.log('Hanging up.');
          this.stopPeerConnection();
          console.log(this.room.name);
          console.log(this.userEntry);
          this.signaling
            .invoke('LeaveRoom', this.room.name, this.userEntry)
            .then(() => {
              this.signaling.disconnect();
            });
          this.router.navigate(['learner_classroom']);
        }
      });
  }

  handleRemoteHangup(): void {
    console.log('Session terminated by remote peer.');
    this.stopPeerConnection();
    this.isInitiator = true;
  }

  stopPeerConnection(): void {
    this.isStarted = false;
    this.isChannelReady = false;
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
  }

  ngOnDestroy(): void {
    this.getUserID().unsubscribe();
    this.getDisplayName().unsubscribe();
    this.getMetaData().unsubscribe();
    if (this.signaling.isConnected()) {
      this.hangup();
    }
  }
}
