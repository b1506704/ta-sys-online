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
// import { DOCUMENT } from '@angular/common';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Router } from '@angular/router';
@Component({
  templateUrl: 'learner-classroom.component.html',
  styleUrls: ['./learner-classroom.component.scss'],
})
export class LearnerClassroomComponent implements OnInit, OnDestroy {
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
  isPopupRoomVisible: boolean;
  isPopupVideoVisible: boolean;
  isShowingLesson: boolean = false;
  isShowingQuestion: boolean = false;
  isShowingAnswer: boolean = false;
  isShowingCorrectAnswer: boolean = false;
  isShowingResult: boolean = false;
  isPresenting: boolean = false;
  selectedTestId: string = '';
  selectedQuestion!: any;
  selectedPresenter!: UserEntry;
  receiveChatUserEntry!: UserEntry;

  userEntry: UserEntry = {
    id: '',
    displayName: '',
  };
  currentCourseId: string = '33ac8c18-1424-4376-bfe3-08d98fe5901d';

  chatUserList: Array<UserEntry> = [];
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
  fileList: Array<File> = [];
  courseData!: Course;
  creatorData!: any;
  subjectData!: Subject;
  streamSessionData!: any;

  constructor(
    private signaling: SignalrService,
    private store: StoreService,
    private fileStore: FileStore,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getMetaData() {
    return this.route.paramMap.subscribe((param) => {
      const session = JSON.parse(param.get('id'));
      this.streamSessionData = session;
      console.log(session);
      this.currentCourseId = session.courseId;
      this.courseData = session.courseTable;
      this.creatorData = session.creator;
      this.room.name = `R${this.courseData.name[0]}${
        this.creatorData.displayName[0]
      }${session.id[0] + session.id[1]}`.toUpperCase();
    });
  }

  openPopupVideo() {
    this.isPopupVideoVisible = true;
  }

  openPopupTest() {
    this.isPopupTestVisible = true;
  }

  openPopupLesson() {
    this.isPopupLessonVisible = true;
  }

  openPopupChat() {
    this.isPopupChatVisible = true;
  }

  openPopupRoom() {
    this.isPopupRoomVisible = true;
  }

  closePopupRoom = () => {
    this.isPopupRoomVisible = false;
  };

  closePopupVideo = () => {
    this.isPopupVideoVisible = false;
  };

  closePopupChat = () => {
    this.isPopupChatVisible = false;
  };

  closePopupLesson = () => {
    this.isPopupLessonVisible = false;
  };

  closePopupTest = () => {
    this.isPopupTestVisible = false;
  };

  getUserID() {
    return this.store.$currentUserId.subscribe((data: string) => {
      if (data) {
        this.userEntry.id = data;
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
        // console.log('IMAGE LIST OF DOCTOR');
        // console.log(this.fileList);
      }
    });
  }

  fetchMediaBySourceID(sourceIDs: Array<any>) {
    const sourceIds = sourceIDs.map((e: any) => e.id);
    this.fileStore.getFiles(sourceIds);
  }

  onSubmit(e: any) {
    e.preventDefault();
    this.start();
  }

  insertAsset = (e: any, type: string, thumbnail: string) => {
    this.assetList = this.assetList.concat({ asset: e, type, thumbnail });
  };

  insertQuiz = (e: any, type: string, thumbnail: string) => {
    this.selectedTestId = e.testId;
    console.log(this.selectedTestId);
    this.quizList = this.quizList.concat({ quiz: e.question, type, thumbnail });
  };

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
  }

  showAnswerChoice(isShow: boolean) {
    this.signaling.invoke('ShowAnswerChoice', this.room.name, isShow);
  }

  showCorrectAnswer(isShow: boolean) {
    this.signaling.invoke('ShowCorrectAnswer', this.room.name, isShow);
  }

  clearBoard() {
    this.blackBoard = [];
  }

  writeBoard(e: any) {
    switch (e.type) {
      case 'lesson':
        this.addLesson(e.asset.id);
        break;
      case 'question':
        this.addQuestion(e.quiz.id);
        break;
      default:
        break;
    }
    // this.blackBloard = this.blackBloard.concat(e);
  }

  removeAsset(e: any) {
    this.assetList = this.assetList.filter(
      (a: any) => a.asset.id !== e.asset.id
    );
    this.store.showNotif(`Removed ${e.asset.name}`, 'custom');
  }

  removeQuiz(e: any) {
    this.quizList = this.quizList.filter((a: any) => a.quiz.id !== e.quiz.id);
    this.store.showNotif(`Removed ${e.quiz.content}`, 'custom');
  }

  addLesson(id: string) {
    this.signaling.invoke('AddLesson', this.room.name, id);
  }

  removeLesson(id: string) {
    this.signaling.invoke('RemoveLesson', this.room.name, id);
  }

  flipLesson(id: string, isFront: boolean) {
    this.signaling.invoke('UpdateLesson', this.room.name, isFront, id);
  }

  addQuestion(id: string) {
    this.signaling.invoke('AddQuestion', this.room.name, id);
  }

  removeQuestion(id: string) {
    this.signaling.invoke('RemoveQuestion', this.room.name, id);
  }

  invitePresenting(userEntry: UserEntry, isPresenting: boolean) {
    this.signaling.invoke(
      'InviteForPresenting',
      this.room.name,
      userEntry,
      isPresenting
    );
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
    });

    this.signaling.define('joined', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
      this.chatUserList = userEntryList;
      this.isChannelReady = true;
    });

    this.signaling.define('left', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
      this.chatUserList = userEntryList;
      // this.isChannelReady = true;
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
      // console.log(this.blackBoard);
      // const stringIds = list.map(
      //   (e: any) => e.userAccountResponse.id
      // );
      // console.log(stringIds);
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
      // console.log(this.lessonList);
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
    console.log('Hanging up.');
    this.stopPeerConnection();
    // this.sendMessage(`${this.userEntry.DisplayName} has left.`);
    console.log(this.room.name);
    console.log(this.userEntry);
    this.signaling
      .invoke('LeaveRoom', this.room.name, this.userEntry)
      .then(() => {
        // setTimeout(() => {
        this.signaling.disconnect();
        // }, 5000);
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
    this.hangup();
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
  }
}
