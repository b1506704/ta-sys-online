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
import { Router } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { Subject } from 'src/app/shared/models/subject';
import { Session } from 'src/app/shared/models/session';
import { WebrtcUtils } from 'src/app/shared/services/streaming/webrtc-utils.service';

const useWebrtcUtils = true;
@Component({
  templateUrl: 'learner-streaming.component.html',
  styleUrls: ['./learner-streaming.component.scss'],
})
export class LearnerStreamingComponent implements OnInit, OnDestroy {
  @ViewChild('localVideo') localVideo: ElementRef;
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  localStream: MediaStream;
  remoteStream: Array<MediaStream> = [];
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

  isReceiver: boolean = false;
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

  currentCalledUser: UserEntry = {
    id: '',
    displayName: '',
  };

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
  totalSeconds = 0;

  timerInterval: any;
  lastingTime?: string;
  isSubmitAnswer: boolean = false;

  constructor(
    private signaling: SignalrService,
    private store: StoreService,
    private router: Router,
    private fileStore: FileStore
  ) {}

  timeCounter() {
    this.timerInterval = setInterval(() => {
      this.timerInterval = setInterval(() => {
        this.getTime();
      }, 1000);
    }, 1000);
  }

  getTime() {
    this.signaling.invoke('GetTime', this.room.name);
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

  openPopupChat() {
    this.isPopupChatVisible = true;
  }

  openPopupSetting() {
    this.isPopupSettingVisible = true;
  }

  closePopupSetting = () => {
    this.isPopupSettingVisible = false;
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
      isPractice: true,
      questionRequest: [questionWithAnswerChoice],
    };
    console.log(doTestRequest);
    this.signaling.invoke('DoTest', this.room.name, doTestRequest);
    this.isShowingResult = true;
    this.isSubmitAnswer = true;
  }

  clearBoard() {
    this.blackBoard = [];
  }

  endCall() {
    this.signaling.invoke('EndCall', this.room.name, this.userEntry);
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

  sendPrivateMessage = (message: string, receiveUserEntry: UserEntry) => {
    const newMessage = {
      userEntry: this.userEntry,
      receiveUserEntry: receiveUserEntry,
      message: message,
      isPrivate: true,
      date: new Date().toLocaleTimeString(),
    };
    this.messageList = this.messageList.concat(newMessage);
    this.signaling.invoke(
      'SendPrivateMessage',
      this.room.name,
      this.userEntry,
      receiveUserEntry,
      message
    );
  };

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
    this.timeCounter();
    this.defineSignaling();
  }

  defineSignaling(): void {
    this.signaling.define('log', (message: any) => {});

    this.signaling.define('created', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
      this.chatUserList = userEntryList;
      this.store.setChatUserList(userEntryList);
      this.isInitiator = true;
      this.fetchMediaBySourceID(userEntryList.map((e: any) => e.id));
    });

    this.signaling.define('joined', (userEntryList: any) => {
      this.isChannelReady = true;
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
      this.chatUserList = userEntryList;
      this.store.setChatUserList(userEntryList);
      this.fetchMediaBySourceID(userEntryList.map((e: any) => e.id));
    });

    this.signaling.define('left', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
      this.chatUserList = userEntryList;
      this.store.setChatUserList(userEntryList);
      this.fetchMediaBySourceID(userEntryList.map((e: any) => e.id));
    });

    this.signaling.define('time', (time: any) => {
      this.lastingTime = time;
    });

    this.signaling.define('isShowAnswerChoice', (isShow: boolean) => {
      this.isShowingAnswer = isShow;
    });

    this.signaling.define('isShowCorrectAnswer', (isShow: boolean) => {
      this.isShowingCorrectAnswer = isShow;
    });

    this.signaling.define('privateCall', (userEntry: any) => {
      console.log(userEntry);
      if (this.userEntry.id == userEntry.id) {
        this.isReceiver = true;
        this.getUserMedia();
        this.openPopupSetting();
        console.log(this.isReceiver);
      } else {
        this.isReceiver = false;
      }
    });

    this.signaling.define('endCall', (userEntry: any) => {
      console.log(userEntry);
      console.log(this.isReceiver);
      if (this.userEntry.id == userEntry.id) {
        this.handleRemoteHangup();
      }
    });

    this.signaling.define('lesson', (list: any) => {
      this.isShowingQuestion = false;
      this.isShowingLesson = true;
      this.isShowingAnswer = false;
      this.isSubmitAnswer = false;
      this.isShowingCorrectAnswer = false;
      this.isShowingResult = false;
      this.blackBoard = list;
      console.log(this.blackBoard);
    });

    this.signaling.define('test', (list: Array<any>) => {
      this.isShowingLesson = false;
      this.isShowingResult = true;
      console.log(list);
      this.resultBoard = list;
      const displayName = list[list.length].userAccountResponse.displayName;
      this.store.showNotif(`${displayName} has submitted an answer`, 'custom');
      this.dxScrollView.instance.scrollBy(150);
    });

    this.signaling.define('question', (question: any) => {
      this.isShowingQuestion = true;
      this.isShowingLesson = false;
      this.isShowingAnswer = false;
      this.isShowingCorrectAnswer = false;
      this.isShowingResult = false;
      this.isSubmitAnswer = false;
      console.log(question);
      this.clearBoard();
      this.blackBoard.push(question);
      console.log(this.blackBoard);
    });

    this.signaling.define(
      'message',
      (chatMessage: any, userEntry: any, date: any) => {
        const message: ChatMessage = {
          userEntry: userEntry,
          message: chatMessage,
          date: date,
        };
        this.messageList = this.messageList.concat(message);
        this.isPopupChatVisible = true;
        if (chatMessage == 'got user media' && this.isReceiver) {
          this.initiateCall();
        } else if (chatMessage.type == 'offer' && this.isReceiver) {
          if (!this.isStarted) {
            this.initiateCall();
          }
          this.peerConnection.setRemoteDescription(
            new RTCSessionDescription(chatMessage)
          );
          this.sendAnswer();
        } else if (
          chatMessage.type == 'answer' &&
          this.isStarted &&
          this.isReceiver
        ) {
          this.peerConnection.setRemoteDescription(
            new RTCSessionDescription(chatMessage)
          );
        } else if (
          chatMessage.type == 'candidate' &&
          this.isStarted &&
          this.isReceiver
        ) {
          this.addIceCandidate(chatMessage);
        }
      }
    );

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
            isPrivate: true,
          };
          this.messageList = this.messageList.concat(message);
          this.isPopupChatVisible = true;
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

  initiateCall(): void {
    this.store.showNotif('Initiating a call', 'custom');
    console.log('Initiating a call.');
    if (!this.isStarted) {
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
    }

    if (this.isInitiator) {
      this.sendOffer();
    }
  }

  sendOffer(): void {
    console.log('Sending offer to peer.');
    // this.addTransceivers();
    this.peerConnection.createOffer().then((sdp: RTCSessionDescriptionInit) => {
      let finalSdp = sdp;
      if (useWebrtcUtils) {
        finalSdp = WebrtcUtils.changeBitrate(sdp, '1000', '500', '6000');
        if (
          WebrtcUtils.getCodecs('audio').find(
            (c) => c.indexOf(WebrtcUtils.OPUS) !== -1
          )
        ) {
          finalSdp = WebrtcUtils.setCodecs(finalSdp, 'audio', WebrtcUtils.OPUS);
        }
        if (
          WebrtcUtils.getCodecs('video').find(
            (c) => c.indexOf(WebrtcUtils.H264) !== -1
          )
        ) {
          finalSdp = WebrtcUtils.setCodecs(finalSdp, 'video', WebrtcUtils.H264);
        }
      }
      this.peerConnection.setLocalDescription(finalSdp);
      this.sendMessage(sdp);
    });
  }

  createPeerConnection(): void {
    console.log('Creating peer connection.');
    this.store.showNotif('Creating peer connection.', 'custom');
    try {
      if (useWebrtcUtils) {
        this.peerConnection = WebrtcUtils.createPeerConnection(
          signalRConfig.iceServers,
          'unified-plan',
          'balanced',
          'all',
          'require',
          null,
          [],
          0
        );
      } else {
        this.peerConnection = new RTCPeerConnection({
          iceServers: signalRConfig.iceServers,
          sdpSemantics: 'unified-plan',
        } as RTCConfiguration);
      }

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
          this.store.showNotif('NEW USER HAS JOINED', 'custom');
        }
      };

      if (useWebrtcUtils) {
        this.peerConnection.oniceconnectionstatechange = () => {
          if (this.peerConnection?.iceConnectionState === 'connected') {
            WebrtcUtils.logStats(this.peerConnection, 'all');
          } else if (this.peerConnection?.iceConnectionState === 'failed') {
            WebrtcUtils.doIceRestart(this.peerConnection, this);
          }
        };
      }
    } catch (e) {
      console.log('Failed to create PeerConnection.', e.message);
      return;
    }
  }

  sendAnswer(): void {
    console.log('Sending answer to peer.');
    // this.addTransceivers();
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

  // addTransceivers(): void {
  //   console.log('Adding transceivers.');
  //   const init = {
  //     direction: 'recvonly',
  //     streams: [],
  //     sendEncodings: [],
  //   } as RTCRtpTransceiverInit;
  //   this.peerConnection.addTransceiver('audio', init);
  //   this.peerConnection.addTransceiver('video', init);
  // }

  addLocalStream(stream: MediaStream): void {
    console.log('Local stream added.');
    this.localStream = stream;
    this.localVideo.nativeElement.srcObject = this.localStream;
    this.localVideo.nativeElement.muted = 'muted';
  }

  addRemoteStream(stream: MediaStream): void {
    console.log('Remote stream added.');
    this.remoteStream.push(stream);
    this.remoteStream = this.remoteStream.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );
    console.log(this.remoteStream);
  }

  adjustLocalVideoStream() {
    if (this.localStream && this.localStream.active) {
      this.localStream.getVideoTracks()[0].enabled =
        !this.localStream.getVideoTracks()[0].enabled;
    }
  }

  adjustLocalAudioStream() {
    if (this.localStream && this.localStream.active) {
      this.localStream.getAudioTracks()[0].enabled =
        !this.localStream.getAudioTracks()[0].enabled;
    }
  }

  hangup(): void {
    this.store
      .confirmDialog('Do you want to end call?')
      .then((confirm: boolean) => {
        if (confirm) {
          this.endCall();
        }
      });
  }

  handleRemoteHangup(): void {
    if (this.localStream && this.localStream.active) {
      this.localStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    if (this.remoteStream) {
      this.remoteStream.forEach((stream: MediaStream) => {
        if (stream.active) {
          stream.getTracks().forEach((track) => {
            track.stop();
          });
        }
      });
    }
    console.log('Hanging up.');
    this.stopPeerConnection();
    this.remoteStream = [];
  }

  stopAllConnection() {
    if (this.localStream && this.localStream.active) {
      this.localStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    if (this.remoteStream) {
      this.remoteStream.forEach((stream: MediaStream) => {
        if (stream.active) {
          stream.getTracks().forEach((track) => {
            track.stop();
          });
        }
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
    this.router.navigate(['instructor_classroom']);
  }

  stopPeerConnection(): void {
    this.isStarted = false;
    this.isChannelReady = false;
    if (this.peerConnection) {
      this.peerConnection.close();
      // this.peerConnection = null;
    }
  }

  disconnect(isForce = false) {
    if (isForce) {
      this.stopAllConnection();
    } else {
      this.store
        .confirmDialog('Do you want to disconnect?')
        .then((confirm: boolean) => {
          if (confirm) {
            this.stopAllConnection();
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.getUserID().unsubscribe();
    this.getDisplayName().unsubscribe();
    this.getMetaData().unsubscribe();
    clearInterval(this.timerInterval);
    if (this.chatUserList.length) {
      this.disconnect(true);
    }
  }
}
