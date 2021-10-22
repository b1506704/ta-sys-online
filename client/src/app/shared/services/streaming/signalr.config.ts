export const signalRConfig = {
  // signalingServerUrl: 'https://ta-sys-online-server.azurewebsites.net/hubs/',
  signalingServerUrl: 'https://localhost:5001/hubs',
  iceServers: [
    { urls: 'stun:stun.1.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
};
