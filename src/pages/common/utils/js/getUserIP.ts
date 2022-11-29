/**
 * 获取用户IP
 */
declare var window: Window; interface Window {
  [p: string]: any;
}

export class GetUserIP {
  constructor() {}
  getUserIP(onNewIP: any) {
    const myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    if (myPeerConnection === undefined || myPeerConnection === null) {
      onNewIP('127.0.0.1');
      return;
    }
    const pc = new myPeerConnection({
      iceServers: []
    });
    const noop = () => { };
    const localIPs = {};
    const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g ;

    function iterateIP(ip) {
      if (!localIPs[ip]) {
        onNewIP(ip);
      }
      localIPs[ip] = true;
    }

    // create a bogus data channel
    pc.createDataChannel('');

    // create offer and set local description
    pc.createOffer().then((sdp: any) => {
      sdp.sdp.split('\n').forEach((line) => {
        if (line.indexOf('candidate') < 0) {
          return;
        }
        line.match(ipRegex).forEach(iterateIP);
      });

      pc.setLocalDescription(sdp, noop, noop);
    }).catch((reason: any) => {
      // An error occurred, so handle the failure to connect
    });

    // sten for candidate events
    pc.onicecandidate = (ice: any) => {
      if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) {
        return;
      }
      ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
  }
}
