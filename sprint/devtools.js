  let reqInfo = {};
  let i = 0;
  //새로고침시 reqInfo 초기화 
  chrome.devtools.network.onNavigated.addListener(()=> {
    reqInfo = {};
  });

  chrome.devtools.network.onRequestFinished.addListener(
    function(request) {
      
      if (request) {
        const url = request.request.url
        if(request.request.postData){
            const postText = request.request.postData.text;
            const url = request.request.url;
            var paramObject = {};
            var keyValuePairs = postText.split('&');

            // 각 키-값 쌍을 추출하여 객체에 추가
            /*
            keyValuePairs.forEach(function(pair) {
                var keyValue = pair.split('=');
                if(keyValue[0] !== '_metaToken'){
                    paramObject[keyValue[0]] = keyValue[1];    
                } 
            });*/

            if(url === "https://collector.github.com/github/collect"){
              chrome.runtime.sendMessage({message: {url:postText}});
              chrome.devtools.inspectedWindow.eval(`chrome.runtime.sendMessage({ action: "request", url:url})`);
              
              chrome.devtools.inspectedWindow.eval(`console.log(\`${reqInfo}\`)`);
            
              //reqInfo[url]=postText;
            }
            //chrome.runtime.sendMessage({ action: "page_refreshed", url: url });
            
            //chrome.devtools.inspectedWindow.eval(`console.log(\`${i}\`)`);
          }
       }
    }
);

  /* const url = request.request.url;
    const method = request.request.method;
    const headers = JSON.stringify(request.request.headers, null, 2);
    const status = request.response.status;
    const statusText = request.response.statusText;

    let postData = 'N/A';
    if (request.request.postData) {
      postData = request.request.postData.text;
    }

    const queryParams = url.split('?')[1];
    const queryParamLog = queryParams ? queryParams.split('&').map(param => decodeURIComponent(param)).join('\n') : 'No query parameters';
*/