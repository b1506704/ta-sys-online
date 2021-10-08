import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SignalrService } from 'src/app/shared/services/streaming/signalr.service';
// import { signalRConfig } from 'src/app/shared/services/streaming/signalr.config';
import { StoreService } from 'src/app/shared/services/store.service';
import { UserHttpService } from 'src/app/shared/services/user/user-http.service';
import { UserEntry } from 'src/app/shared/models/user-entry';
import { ChatMessage } from 'src/app/shared/models/chat-message';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { File } from 'src/app/shared/models/file';
// import { DOCUMENT } from '@angular/common';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Router } from '@angular/router';
@Component({
  templateUrl: 'instructor-streaming.component.html',
  styleUrls: ['./instructor-streaming.component.scss'],
})
export class InstructorStreamingComponent implements OnInit, OnDestroy {
  // @ViewChild('localVideo') localVideo: ElementRef;
  // @ViewChild('remoteVideo') remoteVideo: ElementRef;
  // @ViewChild(DxScrollViewComponent, { static: false })
  // dxScrollView: DxScrollViewComponent;
  // @ViewChild(DxTextBoxComponent, { static: false })
  // dxTextBox: DxTextBoxComponent;
  // localStream: MediaStream;
  // remoteStream: MediaStream;
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

  userEntry: UserEntry = {
    id: '',
    displayName: '',
  };
  currentCourseId: string = '96e29600-fd30-4162-268a-08d989a11e33';

  chatUserList: Array<UserEntry> = [];
  messageList: Array<ChatMessage> = [];
  // lessonList: Array<any> = [];
  // questionList: Array<any> = [];
  assetList: Array<any> = [];
  quizList: Array<any> = [];
  blackBoard: Array<any> = [];

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

  constructor(
    private signaling: SignalrService,
    private userService: UserHttpService,
    private store: StoreService,
    private fileStore: FileStore
  ) {}

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

  getUserInfo(id: string) {
    this.userService
      .getUser(id)
      .toPromise()
      .then((data: any) => {
        return data;
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
        console.log('IMAGE LIST OF DOCTOR');
        console.log(this.fileList);
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
    console.log(this.assetList);
  };

  insertQuiz = (e: any, type: string, thumbnail: string) => {
    this.quizList = this.quizList.concat({ quiz: e, type, thumbnail });
    console.log(this.quizList);
  };

  writeBoard(e: any) {
    console.log(e);
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

  ngOnInit(): void {
    this.fileDataListener();
    this.getUserID();
    this.getDisplayName();
    this.signaling.connect('/auth', false).then(() => {
      if (this.signaling.isConnected()) {
        this.signaling.invoke('Authorize').then((token: string) => {
          if (token) {
            sessionStorage.setItem('token', token);
            // this.start();
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

    // #3 get media from current client
    // this.getUserMedia();
  }

  defineSignaling(): void {
    this.signaling.define('log', (message: any) => {
      console.log(message);
    });

    this.signaling.define('created', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
      this.chatUserList = userEntryList;
      // this.isInitiator = true;
    });

    this.signaling.define('joined', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
      this.chatUserList = userEntryList;
      // this.isChannelReady = true;
    });

    this.signaling.define('left', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
      this.chatUserList = userEntryList;
      // this.isChannelReady = true;
    });

    // this.signaling.define('flip', (isFront: boolean, id: string) => {
    //   console.log('CURRENT FLIP LIST');
    //   console.log(id);
    //   this.updateLesson(id, isFront);
    // });

    this.signaling.define('lesson', (list: any) => {
      // this.lessonList = list;
      this.blackBoard = list;
      this.fetchMediaBySourceID(list);
      // console.log(this.lessonList);
      console.log(this.blackBoard);
    });

    this.signaling.define('question', (question: any) => {
      // this.lessonList = list;
      this.blackBoard = question;
      this.fetchMediaBySourceID(question);
      // console.log(this.lessonList);
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
        console.log(message);
        this.messageList = this.messageList.concat(message);
        console.log(this.messageList);
        // if (message === 'got user media') {
        //   this.initiateCall();
        // } else if (message.type === 'offer') {
        //   if (!this.isStarted) {
        //     this.initiateCall();
        //   }
        //   this.peerConnection.setRemoteDescription(
        //     new RTCSessionDescription(message)
        //   );
        //   this.sendAnswer();
        // } else if (message.type === 'answer' && this.isStarted) {
        //   this.peerConnection.setRemoteDescription(
        //     new RTCSessionDescription(message)
        //   );
        // } else if (message.type === 'candidate' && this.isStarted) {
        //   this.addIceCandidate(message);
        // } else if (message === 'bye' && this.isStarted) {
        //   this.handleRemoteHangup();
        // }
      }
    );
  }

  // getUserMedia(): void {
  //   navigator.mediaDevices
  //     .getUserMedia({
  //       audio: true,
  //       video: true,
  //     })
  //     .then((stream: MediaStream) => {
  //       this.addLocalStream(stream);
  //       this.sendMessage('got user media');
  //       if (this.isInitiator) {
  //         this.initiateCall();
  //       }
  //     })
  //     .catch((e) => {
  //       alert('getUserMedia() error: ' + e.name + ': ' + e.message);
  //     });
  // }

  // initiateCall(): void {
  //   console.log('Initiating a call.');
  //   if (!this.isStarted && this.localStream && this.isChannelReady) {
  //     this.createPeerConnection();

  //     this.peerConnection.addTrack(
  //       this.localStream.getVideoTracks()[0],
  //       this.localStream
  //     );
  //     this.peerConnection.addTrack(
  //       this.localStream.getAudioTracks()[0],
  //       this.localStream
  //     );

  //     this.isStarted = true;
  //     if (this.isInitiator) {
  //       this.sendOffer();
  //     }
  //   }
  // }

  // createPeerConnection(): void {
  //   console.log('Creating peer connection.');
  //   try {
  //     this.peerConnection = new RTCPeerConnection({
  //       iceServers: signalRConfig.iceServers,
  //       sdpSemantics: 'unified-plan',
  //     } as RTCConfiguration);

  //     this.peerConnection.onicecandidate = (
  //       event: RTCPeerConnectionIceEvent
  //     ) => {
  //       if (event.candidate) {
  //         this.sendIceCandidate(event);
  //       } else {
  //         console.log('End of candidates.');
  //       }
  //     };

  //     this.peerConnection.ontrack = (event: RTCTrackEvent) => {
  //       console.log(event.streams);
  //       if (event.streams[0]) {
  //         this.addRemoteStream(event.streams[0]);
  //       }
  //     };
  //   } catch (e) {
  //     console.log('Failed to create PeerConnection.', e.message);
  //     return;
  //   }
  // }

  // sendOffer(): void {
  //   console.log('Sending offer to peer.');
  //   this.addTransceivers();
  //   this.peerConnection.createOffer().then((sdp: RTCSessionDescriptionInit) => {
  //     this.peerConnection.setLocalDescription(sdp);
  //     this.sendMessage(sdp);
  //   });
  // }

  // sendAnswer(): void {
  //   console.log('Sending answer to peer.');
  //   this.addTransceivers();
  //   this.peerConnection.createAnswer().then((sdp: RTCSessionDescription) => {
  //     this.peerConnection.setLocalDescription(sdp);
  //     this.sendMessage(sdp);
  //   });
  // }

  // addIceCandidate(message: any): void {
  //   console.log('Adding ice candidate.');
  //   const candidate = new RTCIceCandidate({
  //     sdpMLineIndex: message.label,
  //     candidate: message.candidate,
  //   });
  //   this.peerConnection.addIceCandidate(candidate);
  // }

  // sendIceCandidate(event: RTCPeerConnectionIceEvent): void {
  //   console.log('Sending ice candidate to remote peer.');
  //   this.sendMessage({
  //     type: 'candidate',
  //     label: event.candidate.sdpMLineIndex,
  //     id: event.candidate.sdpMid,
  //     candidate: event.candidate.candidate,
  //   });
  // }

  sendMessage = (message: string) => {
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

  // addLocalStream(stream: MediaStream): void {
  //   console.log('Local stream added.');
  //   this.localStream = stream;
  //   this.localVideo.nativeElement.srcObject = this.localStream;
  //   this.localVideo.nativeElement.muted = 'muted';
  // }

  // addRemoteStream(stream: MediaStream): void {
  //   console.log('Remote stream added.');
  //   this.remoteStream = stream;
  //   this.remoteVideo.nativeElement.srcObject = this.remoteStream;
  //   this.remoteVideo.nativeElement.muted = 'muted';
  // }

  hangup(): void {
    console.log('Hanging up.');
    // this.stopPeerConnection();
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

  // handleRemoteHangup(): void {
  //   console.log('Session terminated by remote peer.');
  //   this.stopPeerConnection();
  //   this.isInitiator = true;
  // }

  // stopPeerConnection(): void {
  //   this.isStarted = false;
  //   this.isChannelReady = false;
  //   if (this.peerConnection) {
  //     this.peerConnection.close();
  //     this.peerConnection = null;
  //   }
  // }

  ngOnDestroy(): void {
    this.getUserID().unsubscribe();
    this.getDisplayName().unsubscribe();
    this.hangup();
    // if (this.localStream && this.localStream.active) {
    //   this.localStream.getTracks().forEach((track) => {
    //     track.stop();
    //   });
    // }
    // if (this.remoteStream && this.remoteStream.active) {
    //   this.remoteStream.getTracks().forEach((track) => {
    //     track.stop();
    //   });
    // }
  }
}
