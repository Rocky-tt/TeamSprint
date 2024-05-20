let reqInfo = {};
let i = 0;
console.log("Background script is running!");

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // 메시지가 오면 콘솔에 출력
    console.log("Message from devtools.js:", message);
  });