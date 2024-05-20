// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// The function below is executed in the context of the inspected page.
/*global $0*/

  chrome.devtools.network.onRequestFinished.addListener(
    function(request) {
      
      if (request) {
        const url = request.request.url
        if(request.request.postData){
            const postText = request.request.postData.text;

            var paramObject = {};
            var keyValuePairs = postText.split('&');

            // 각 키-값 쌍을 추출하여 객체에 추가
            keyValuePairs.forEach(function(pair) {
                var keyValue = pair.split('=');
                if(keyValue[0] !== '_metaToken'){
                    paramObject[keyValue[0]] = keyValue[1];    
                } 
            });
            chrome.devtools.inspectedWindow.eval(`console.log(\`${Object.keys(paramObject)}\`)`);
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