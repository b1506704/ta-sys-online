export const signalRConfig = {
  signalingServerUrl: 'https://ta-sys-online-server.azurewebsites.net/hubs/',
  iceServers: [
    { urls: 'stun:stun.services.mozilla.com"' },
    { urls: 'stun:stun.l.google.com:19302' },
  ],
};
