const axios = require('axios');
 
const getLanguageById = (lang)=>{

    const language = {
        "c++":54,
        "java":62,
        "javascript":63,
        "python":113
    }

    return language[lang.toLowerCase()];
}

const submitBatch = async(submissions)=>{

    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            base64_encoded: 'false'
        },
        headers: {
            'x-rapidapi-key': '770a8c9cafmsh85f9431cd5cc3c8p1e6773jsn8b20106b0ff5',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data:{
            submissions
        }
    };

    async function fetchData() {
	    try {
		    const response = await axios.request(options);
            console.log("Submit Batch:-");
            console.log(response);
		    return response.data;
	    } 
        catch (error) {
		    console.error(error.message);
	    }
    }
    return fetchData();
};

const waiting = async(timer)=>{
    setTimeout(() => {
        return 1;
    }, timer);
}


const submitToken = async (resultToken)=>{

    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            tokens: resultToken.join(","),
            base64_encoded: 'false',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': '770a8c9cafmsh85f9431cd5cc3c8p1e6773jsn8b20106b0ff5',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    };

    async function fetchData() {
	    try {
		    const response = await axios.request(options);

            console.log("Submit Token");
            console.log(response);
            console.log(response.data.submissions);
		    return (response.data);
	    } 
        catch (error) {
		    console.error(error.message);
	    }
    }

    while(true){

    
        const result = await fetchData();

        const IsResultObtained = result.submissions.every((r)=>r.status.id>2);

        if(IsResultObtained) return result.submissions;

        await waiting(1000);
    }

}
module.exports = {getLanguageById, submitBatch, submitToken};






// [
//   {
//     "id": 1,
//     "description": "In Queue"
//   },
//   {
//     "id": 2,
//     "description": "Processing"
//   },
//   {
//     "id": 3,
//     "description": "Accepted"
//   },
//   {
//     "id": 4,
//     "description": "Wrong Answer"
//   },
//   {
//     "id": 5,
//     "description": "Time Limit Exceeded"
//   },
//   {
//     "id": 6,
//     "description": "Compilation Error"
//   },
//   {
//     "id": 7,
//     "description": "Runtime Error (SIGSEGV)"
//   },
//   {
//     "id": 8,
//     "description": "Runtime Error (SIGXFSZ)"
//   },
//   {
//     "id": 9,
//     "description": "Runtime Error (SIGFPE)"
//   },
//   {
//     "id": 10,
//     "description": "Runtime Error (SIGABRT)"
//   },
//   {
//     "id": 11,
//     "description": "Runtime Error (NZEC)"
//   },
//   {
//     "id": 12,
//     "description": "Runtime Error (Other)"
//   },
//   {
//     "id": 13,
//     "description": "Internal Error"
//   },
//   {
//     "id": 14,
//     "description": "Exec Format Error"
//   }
// ]







// Submit Batch:-
// {
//   status: 201,
//   statusText: 'Created',
//   headers: Object [AxiosHeaders] {
//     date: 'Tue, 24 Mar 2026 14:12:27 GMT',
//     'content-type': 'application/json; charset=utf-8',
//     'transfer-encoding': 'chunked',
//     connection: 'keep-alive',
//     etag: 'W/"231d43a60f004041d98281280d75f45f"',
//     'cache-control': 'max-age=0, private, must-revalidate',
//     nel: '{"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}',
//     'cf-ray': '9e16455898ac9e3b-SIN',
//     'cf-cache-status': 'DYNAMIC',
//     'x-judge0-region': 'FSN',
//     'cf-placement': 'local-SIN',
//     'x-judge0-submission-count': '2',
//     'x-judge0-tat': '173',
//     'x-request-id': '78efbec6-a4b4-4931-b839-66facb163484',
//     'x-runtime': '0.007979',
//     vary: 'Origin',
//     'access-control-expose-headers': 'X-Judge0-Region',
//     'alt-svc': 'h3=":443"; ma=86400',
//     'report-to': '{"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=Ws7CaGgatlSsjBSx37HtX8wXY6LboXCFt2Yxgh80jtuckiCR8tBncZ%2BtyFRvOQZpilkcKfGZxEFXLfdm5bZ1lW78epy8MSP%2F02fdtQA%3D"}]}',
//     'x-ratelimit-batched-submissions-limit': '50',
//     'x-ratelimit-batched-submissions-remaining': '49',
//     'x-ratelimit-batched-submissions-reset': '62201',
//     'x-ratelimit-rapid-free-plans-hard-limit-limit': '500000',
//     'x-ratelimit-rapid-free-plans-hard-limit-remaining': '499939',
//     'x-ratelimit-rapid-free-plans-hard-limit-reset': '1012601',
//     'x-ratelimit-submissions-limit': '50',
//     'x-ratelimit-submissions-remaining': '50',
//     'x-ratelimit-submissions-reset': '62201',
//     server: 'RapidAPI-0.0.29',
//     'x-rapidapi-version': '0.0.29',
//     'x-rapidapi-region': 'AWS - ap-southeast-1',
//     'x-rapidapi-request-id': '7f79133c07ca21a4a6bd6c70273a03a9495ffc875f7f1e3dd1f1f21dce10b652',
//     'x-content-type-options': 'nosniff',
//     'x-frame-options': 'DENY',
//     'referrer-policy': 'strict-origin-when-cross-origin'
//   },
//   config: {
//     transitional: {
//       silentJSONParsing: true,
//       forcedJSONParsing: true,
//       clarifyTimeoutError: false,
//       legacyInterceptorReqResOrdering: true
//     },
//     adapter: [ 'xhr', 'http', 'fetch' ],
//     transformRequest: [ [Function: transformRequest] ],
//     transformResponse: [ [Function: transformResponse] ],
//     timeout: 0,
//     xsrfCookieName: 'XSRF-TOKEN',
//     xsrfHeaderName: 'X-XSRF-TOKEN',
//     maxContentLength: -1,
//     maxBodyLength: -1,
//     env: { FormData: [Function], Blob: [class Blob] },
//     validateStatus: [Function: validateStatus],
//     headers: Object [AxiosHeaders] {
//       Accept: 'application/json, text/plain, */*',
//       'Content-Type': 'application/json',
//       'x-rapidapi-key': '770a8c9cafmsh85f9431cd5cc3c8p1e6773jsn8b20106b0ff5',
//       'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
//       'User-Agent': 'axios/1.13.6',
//       'Content-Length': '1127',
//       'Accept-Encoding': 'gzip, compress, deflate, br'
//     },
//     method: 'post',
//     url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
//     params: { base64_encoded: 'false' },
//     data: `{"submissions":[{"source_code":"const fs = require('fs');\\nconst input = fs.readFileSync(0,'utf8').trim().split('\\\\n');\\nconst nums = JSON.parse(input[0]);\\nconst target = Number(input[1]);\\n\\nfunction twoSum(nums, target) {\\n  const map = new Map();\\n  for (let i = 0; i < nums.length; i++) {\\n    const complement = target - nums[i];\\n    if (map.has(complement)) {\\n      return [map.get(complement), i];\\n    }\\n    map.set(nums[i], i);\\n  }\\n}\\n\\nconsole.log(JSON.stringify(twoSum(nums, target)));","language_id":63,"stdin":"[2,7,11,15]\\n9","expected_output":"[0,1]"},{"source_code":"const fs = require('fs');\\nconst input = fs.readFileSync(0,'utf8').trim().split('\\\\n');\\nconst nums = JSON.parse(input[0]);\\nconst target = Number(input[1]);\\n\\nfunction twoSum(nums, target) {\\n  const map = new Map();\\n  for (let i = 0; i < nums.length; i++) {\\n    const complement = target - nums[i];\\n    if (map.has(complement)) {\\n      return [map.get(complement), i];\\n    }\\n    map.set(nums[i], i);\\n  }\\n}\\n\\nconsole.log(JSON.stringify(twoSum(nums, target)));","language_id":63,"stdin":"[3,2,4]\\n6","expected_output":"[1,2]"}]}`,
//     allowAbsoluteUrls: true
//   },
//   request: <ref *1> ClientRequest {
//     _events: [Object: null prototype] {
//       abort: [Function (anonymous)],
//       aborted: [Function (anonymous)],
//       connect: [Function (anonymous)],
//       error: [Function (anonymous)],
//       socket: [Function (anonymous)],
//       timeout: [Function (anonymous)],
//       finish: [Function: requestOnFinish]
//     },
//     _eventsCount: 7,
//     _maxListeners: undefined,
//     outputData: [],
//     outputSize: 0,
//     writable: true,
//     destroyed: true,
//     _last: false,
//     chunkedEncoding: false,
//     shouldKeepAlive: true,
//     maxRequestsOnConnectionReached: false,
//     _defaultKeepAlive: true,
//     useChunkedEncodingByDefault: true,
//     sendDate: false,
//     _removedConnection: false,
//     _removedContLen: false,
//     _removedTE: false,
//     strictContentLength: false,
//     _contentLength: 1127,
//     _hasBody: true,
//     _trailer: '',
//     finished: true,
//     _headerSent: true,
//     _closed: true,
//     _header: 'POST /submissions/batch?base64_encoded=false HTTP/1.1\r\n' +
//       'Accept: application/json, text/plain, */*\r\n' +
//       'Content-Type: application/json\r\n' +
//       'x-rapidapi-key: 770a8c9cafmsh85f9431cd5cc3c8p1e6773jsn8b20106b0ff5\r\n' +
//       'x-rapidapi-host: judge0-ce.p.rapidapi.com\r\n' +
//       'User-Agent: axios/1.13.6\r\n' +
//       'Content-Length: 1127\r\n' +
//       'Accept-Encoding: gzip, compress, deflate, br\r\n' +
//       'Host: judge0-ce.p.rapidapi.com\r\n' +
//       'Connection: keep-alive\r\n' +
//       '\r\n',
//     _keepAliveTimeout: 0,
//     _onPendingData: [Function: nop],
//     agent: Agent {
//       _events: [Object: null prototype],
//       _eventsCount: 2,
//       _maxListeners: undefined,
//       defaultPort: 443,
//       protocol: 'https:',
//       options: [Object: null prototype],
//       requests: [Object: null prototype] {},
//       sockets: [Object: null prototype] {},
//       freeSockets: [Object: null prototype],
//       keepAliveMsecs: 1000,
//       keepAlive: true,
//       maxSockets: Infinity,
//       maxFreeSockets: 256,
//       scheduling: 'lifo',
//       maxTotalSockets: Infinity,
//       totalSocketCount: 1,
//       maxCachedSessions: 100,
//       _sessionCache: [Object],
//       [Symbol(shapeMode)]: false,
//       [Symbol(kCapture)]: false
//     },
//     socketPath: undefined,
//     method: 'POST',
//     maxHeaderSize: undefined,
//     insecureHTTPParser: undefined,
//     joinDuplicateHeaders: undefined,
//     path: '/submissions/batch?base64_encoded=false',
//     _ended: true,
//     res: IncomingMessage {
//       _events: [Object],
//       _readableState: [ReadableState],
//       _maxListeners: undefined,
//       socket: null,
//       httpVersionMajor: 1,
//       httpVersionMinor: 1,
//       httpVersion: '1.1',
//       complete: true,
//       rawHeaders: [Array],
//       rawTrailers: [],
//       joinDuplicateHeaders: undefined,
//       aborted: false,
//       upgrade: false,
//       url: '',
//       method: null,
//       statusCode: 201,
//       statusMessage: 'Created',
//       client: [TLSSocket],
//       _consuming: true,
//       _dumped: false,
//       req: [Circular *1],
//       _eventsCount: 4,
//       responseUrl: 'https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=false',
//       redirects: [],
//       [Symbol(shapeMode)]: true,
//       [Symbol(kCapture)]: false,
//       [Symbol(kHeaders)]: [Object],
//       [Symbol(kHeadersCount)]: 70,
//       [Symbol(kTrailers)]: null,
//       [Symbol(kTrailersCount)]: 0
//     },
//     aborted: false,
//     timeoutCb: null,
//     upgradeOrConnect: false,
//     parser: null,
//     maxHeadersCount: null,
//     reusedSocket: false,
//     host: 'judge0-ce.p.rapidapi.com',
//     protocol: 'https:',
//     _redirectable: Writable {
//       _events: [Object],
//       _writableState: [WritableState],
//       _maxListeners: undefined,
//       _options: [Object],
//       _ended: true,
//       _ending: true,
//       _redirectCount: 0,
//       _redirects: [],
//       _requestBodyLength: 1127,
//       _requestBodyBuffers: [],
//       _eventsCount: 3,
//       _onNativeResponse: [Function (anonymous)],
//       _currentRequest: [Circular *1],
//       _currentUrl: 'https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=false',
//       _timeout: null,
//       [Symbol(shapeMode)]: true,
//       [Symbol(kCapture)]: false
//     },
//     [Symbol(shapeMode)]: false,
//     [Symbol(kCapture)]: false,
//     [Symbol(kBytesWritten)]: 0,
//     [Symbol(kNeedDrain)]: false,
//     [Symbol(corked)]: 0,
//     [Symbol(kChunkedBuffer)]: [],
//     [Symbol(kChunkedLength)]: 0,
//     [Symbol(kSocket)]: TLSSocket {
//       _tlsOptions: [Object],
//       _secureEstablished: true,
//       _securePending: false,
//       _newSessionPending: false,
//       _controlReleased: true,
//       secureConnecting: false,
//       _SNICallback: null,
//       servername: 'judge0-ce.p.rapidapi.com',
//       alpnProtocol: false,
//       authorized: true,
//       authorizationError: null,
//       encrypted: true,
//       _events: [Object: null prototype],
//       _eventsCount: 9,
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: 'judge0-ce.p.rapidapi.com',
//       _closeAfterHandlingError: false,
//       _readableState: [ReadableState],
//       _writableState: [WritableState],
//       allowHalfOpen: false,
//       _maxListeners: undefined,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: undefined,
//       _server: null,
//       ssl: [TLSWrap],
//       _requestCert: true,
//       _rejectUnauthorized: true,
//       timeout: 5000,
//       parser: null,
//       _httpMessage: null,
//       autoSelectFamilyAttemptedAddresses: [Array],
//       [Symbol(alpncallback)]: null,
//       [Symbol(res)]: [TLSWrap],
//       [Symbol(verified)]: true,
//       [Symbol(pendingSession)]: null,
//       [Symbol(async_id_symbol)]: -1,
//       [Symbol(kHandle)]: [TLSWrap],
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: Timeout {
//         _idleTimeout: 5000,
//         _idlePrev: [TimersList],
//         _idleNext: [Timeout],
//         _idleStart: 62833,
//         _onTimeout: [Function: bound ],
//         _timerArgs: undefined,
//         _repeat: null,
//         _destroyed: false,
//         [Symbol(refed)]: false,
//         [Symbol(kHasPrimitive)]: false,
//         [Symbol(asyncId)]: 2122,
//         [Symbol(triggerId)]: 2120,
//         [Symbol(kAsyncContextFrame)]: undefined
//       },
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(shapeMode)]: true,
//       [Symbol(kCapture)]: false,
//       [Symbol(kSetNoDelay)]: false,
//       [Symbol(kSetKeepAlive)]: true,
//       [Symbol(kSetKeepAliveInitialDelay)]: 1,
//       [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0,
//       [Symbol(connect-options)]: [Object]
//     },
//     [Symbol(kOutHeaders)]: [Object: null prototype] {
//       accept: [Array],
//       'content-type': [Array],
//       'x-rapidapi-key': [Array],
//       'x-rapidapi-host': [Array],
//       'user-agent': [Array],
//       'content-length': [Array],
//       'accept-encoding': [Array],
//       host: [Array]
//     },
//     [Symbol(errored)]: null,
//     [Symbol(kHighWaterMark)]: 16384,
//     [Symbol(kRejectNonStandardBodyWrites)]: false,
//     [Symbol(kUniqueHeaders)]: null
//   },
//   data: [
//     { token: 'c6d2e1b9-9184-40f3-92c4-662bab41d4ae' },
//     { token: '0d62bcad-124f-412b-9aed-92f94a8175a6' }
//   ]
// }
// Submit Token
// {
//   status: 200,
//   statusText: 'OK',
//   headers: Object [AxiosHeaders] {
//     date: 'Tue, 24 Mar 2026 14:12:28 GMT',
//     'content-type': 'application/json; charset=utf-8',
//     'transfer-encoding': 'chunked',
//     connection: 'keep-alive',
//     'cache-control': 'max-age=0, private, must-revalidate',
//     etag: 'W/"5077956f33d502c2180cc8301eceb3cb"',
//     'cf-ray': '9e16455b9ffbfe15-SIN',
//     'cf-cache-status': 'DYNAMIC',
//     'alt-svc': 'h3=":443"; ma=86400',
//     'x-judge0-region': 'FSN',
//     'cf-placement': 'local-SIN',
//     'x-judge0-tat': '188',
//     'x-request-id': '3e70982f-0403-49de-924d-114bf911284f',
//     'x-runtime': '0.004048',
//     nel: '{"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}',
//     vary: 'Origin',
//     'report-to': '{"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=kBLP1nQE5xAnu%2F8z9qIRsGF%2F67jthgjeqeqVgoLS29U2ultYA3E8aUc24uWorpcUg0LjUvjCzZYdQIq%2FyI%2BIEmnUoHG%2F3xrIfsfj2Mc%3D"}]}',
//     'access-control-expose-headers': 'X-Judge0-Region',
//     'x-ratelimit-submissions-limit': '50',
//     'x-ratelimit-submissions-remaining': '50',
//     'x-ratelimit-submissions-reset': '62200',
//     'x-ratelimit-batched-submissions-limit': '50',
//     'x-ratelimit-batched-submissions-remaining': '49',
//     'x-ratelimit-batched-submissions-reset': '62200',
//     'x-ratelimit-rapid-free-plans-hard-limit-limit': '500000',
//     'x-ratelimit-rapid-free-plans-hard-limit-remaining': '499938',
//     'x-ratelimit-rapid-free-plans-hard-limit-reset': '1012600',
//     server: 'RapidAPI-0.0.29',
//     'x-rapidapi-version': '0.0.29',
//     'x-rapidapi-region': 'AWS - ap-southeast-1',
//     'x-rapidapi-request-id': '7b58716e7e2745bc2ea235b3d7f28477272b47775f204854457f7ed81d899bf4',
//     'x-content-type-options': 'nosniff',
//     'x-frame-options': 'DENY',
//     'referrer-policy': 'strict-origin-when-cross-origin'
//   },
//   config: {
//     transitional: {
//       silentJSONParsing: true,
//       forcedJSONParsing: true,
//       clarifyTimeoutError: false,
//       legacyInterceptorReqResOrdering: true
//     },
//     adapter: [ 'xhr', 'http', 'fetch' ],
//     transformRequest: [ [Function: transformRequest] ],
//     transformResponse: [ [Function: transformResponse] ],
//     timeout: 0,
//     xsrfCookieName: 'XSRF-TOKEN',
//     xsrfHeaderName: 'X-XSRF-TOKEN',
//     maxContentLength: -1,
//     maxBodyLength: -1,
//     env: { FormData: [Function], Blob: [class Blob] },
//     validateStatus: [Function: validateStatus],
//     headers: Object [AxiosHeaders] {
//       Accept: 'application/json, text/plain, */*',
//       'Content-Type': 'application/json',
//       'x-rapidapi-key': '770a8c9cafmsh85f9431cd5cc3c8p1e6773jsn8b20106b0ff5',
//       'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
//       'User-Agent': 'axios/1.13.6',
//       'Accept-Encoding': 'gzip, compress, deflate, br'
//     },
//     method: 'get',
//     url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
//     params: {
//       tokens: 'c6d2e1b9-9184-40f3-92c4-662bab41d4ae,0d62bcad-124f-412b-9aed-92f94a8175a6',
//       base64_encoded: 'false',
//       fields: '*'
//     },
//     allowAbsoluteUrls: true,
//     data: undefined
//   },
//   request: <ref *1> ClientRequest {
//     _events: [Object: null prototype] {
//       abort: [Function (anonymous)],
//       aborted: [Function (anonymous)],
//       connect: [Function (anonymous)],
//       error: [Function (anonymous)],
//       socket: [Function (anonymous)],
//       timeout: [Function (anonymous)],
//       finish: [Function: requestOnFinish]
//     },
//     _eventsCount: 7,
//     _maxListeners: undefined,
//     outputData: [],
//     outputSize: 0,
//     writable: true,
//     destroyed: true,
//     _last: true,
//     chunkedEncoding: false,
//     shouldKeepAlive: true,
//     maxRequestsOnConnectionReached: false,
//     _defaultKeepAlive: true,
//     useChunkedEncodingByDefault: false,
//     sendDate: false,
//     _removedConnection: false,
//     _removedContLen: false,
//     _removedTE: false,
//     strictContentLength: false,
//     _contentLength: 0,
//     _hasBody: true,
//     _trailer: '',
//     finished: true,
//     _headerSent: true,
//     _closed: true,
//     _header: 'GET /submissions/batch?tokens=c6d2e1b9-9184-40f3-92c4-662bab41d4ae,0d62bcad-124f-412b-9aed-92f94a8175a6&base64_encoded=false&fields=* HTTP/1.1\r\n' +
//       'Accept: application/json, text/plain, */*\r\n' +
//       'Content-Type: application/json\r\n' +
//       'x-rapidapi-key: 770a8c9cafmsh85f9431cd5cc3c8p1e6773jsn8b20106b0ff5\r\n' +
//       'x-rapidapi-host: judge0-ce.p.rapidapi.com\r\n' +
//       'User-Agent: axios/1.13.6\r\n' +
//       'Accept-Encoding: gzip, compress, deflate, br\r\n' +
//       'Host: judge0-ce.p.rapidapi.com\r\n' +
//       'Connection: keep-alive\r\n' +
//       '\r\n',
//     _keepAliveTimeout: 0,
//     _onPendingData: [Function: nop],
//     agent: Agent {
//       _events: [Object: null prototype],
//       _eventsCount: 2,
//       _maxListeners: undefined,
//       defaultPort: 443,
//       protocol: 'https:',
//       options: [Object: null prototype],
//       requests: [Object: null prototype] {},
//       sockets: [Object: null prototype] {},
//       freeSockets: [Object: null prototype],
//       keepAliveMsecs: 1000,
//       keepAlive: true,
//       maxSockets: Infinity,
//       maxFreeSockets: 256,
//       scheduling: 'lifo',
//       maxTotalSockets: Infinity,
//       totalSocketCount: 1,
//       maxCachedSessions: 100,
//       _sessionCache: [Object],
//       [Symbol(shapeMode)]: false,
//       [Symbol(kCapture)]: false
//     },
//     socketPath: undefined,
//     method: 'GET',
//     maxHeaderSize: undefined,
//     insecureHTTPParser: undefined,
//     joinDuplicateHeaders: undefined,
//     path: '/submissions/batch?tokens=c6d2e1b9-9184-40f3-92c4-662bab41d4ae,0d62bcad-124f-412b-9aed-92f94a8175a6&base64_encoded=false&fields=*',
//     _ended: true,
//     res: IncomingMessage {
//       _events: [Object],
//       _readableState: [ReadableState],
//       _maxListeners: undefined,
//       socket: null,
//       httpVersionMajor: 1,
//       httpVersionMinor: 1,
//       httpVersion: '1.1',
//       complete: true,
//       rawHeaders: [Array],
//       rawTrailers: [],
//       joinDuplicateHeaders: undefined,
//       aborted: false,
//       upgrade: false,
//       url: '',
//       method: null,
//       statusCode: 200,
//       statusMessage: 'OK',
//       client: [TLSSocket],
//       _consuming: true,
//       _dumped: false,
//       req: [Circular *1],
//       _eventsCount: 4,
//       responseUrl: 'https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=c6d2e1b9-9184-40f3-92c4-662bab41d4ae,0d62bcad-124f-412b-9aed-92f94a8175a6&base64_encoded=false&fields=*',
//       redirects: [],
//       [Symbol(shapeMode)]: true,
//       [Symbol(kCapture)]: false,
//       [Symbol(kHeaders)]: [Object],
//       [Symbol(kHeadersCount)]: 70,
//       [Symbol(kTrailers)]: null,
//       [Symbol(kTrailersCount)]: 0
//     },
//     aborted: false,
//     timeoutCb: null,
//     upgradeOrConnect: false,
//     parser: null,
//     maxHeadersCount: null,
//     reusedSocket: true,
//     host: 'judge0-ce.p.rapidapi.com',
//     protocol: 'https:',
//     _redirectable: Writable {
//       _events: [Object],
//       _writableState: [WritableState],
//       _maxListeners: undefined,
//       _options: [Object],
//       _ended: true,
//       _ending: true,
//       _redirectCount: 0,
//       _redirects: [],
//       _requestBodyLength: 0,
//       _requestBodyBuffers: [],
//       _eventsCount: 3,
//       _onNativeResponse: [Function (anonymous)],
//       _currentRequest: [Circular *1],
//       _currentUrl: 'https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=c6d2e1b9-9184-40f3-92c4-662bab41d4ae,0d62bcad-124f-412b-9aed-92f94a8175a6&base64_encoded=false&fields=*',
//       _timeout: null,
//       [Symbol(shapeMode)]: true,
//       [Symbol(kCapture)]: false
//     },
//     [Symbol(shapeMode)]: false,
//     [Symbol(kCapture)]: false,
//     [Symbol(kBytesWritten)]: 0,
//     [Symbol(kNeedDrain)]: false,
//     [Symbol(corked)]: 0,
//     [Symbol(kChunkedBuffer)]: [],
//     [Symbol(kChunkedLength)]: 0,
//     [Symbol(kSocket)]: TLSSocket {
//       _tlsOptions: [Object],
//       _secureEstablished: true,
//       _securePending: false,
//       _newSessionPending: false,
//       _controlReleased: true,
//       secureConnecting: false,
//       _SNICallback: null,
//       servername: 'judge0-ce.p.rapidapi.com',
//       alpnProtocol: false,
//       authorized: true,
//       authorizationError: null,
//       encrypted: true,
//       _events: [Object: null prototype],
//       _eventsCount: 9,
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: 'judge0-ce.p.rapidapi.com',
//       _closeAfterHandlingError: false,
//       _readableState: [ReadableState],
//       _writableState: [WritableState],
//       allowHalfOpen: false,
//       _maxListeners: undefined,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: undefined,
//       _server: null,
//       ssl: [TLSWrap],
//       _requestCert: true,
//       _rejectUnauthorized: true,
//       timeout: 5000,
//       parser: null,
//       _httpMessage: null,
//       autoSelectFamilyAttemptedAddresses: [Array],
//       [Symbol(alpncallback)]: null,
//       [Symbol(res)]: [TLSWrap],
//       [Symbol(verified)]: true,
//       [Symbol(pendingSession)]: null,
//       [Symbol(async_id_symbol)]: -1,
//       [Symbol(kHandle)]: [TLSWrap],
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: Timeout {
//         _idleTimeout: 5000,
//         _idlePrev: [TimersList],
//         _idleNext: [Timeout],
//         _idleStart: 63206,
//         _onTimeout: [Function: bound ],
//         _timerArgs: undefined,
//         _repeat: null,
//         _destroyed: false,
//         [Symbol(refed)]: false,
//         [Symbol(kHasPrimitive)]: false,
//         [Symbol(asyncId)]: 2168,
//         [Symbol(triggerId)]: 2166,
//         [Symbol(kAsyncContextFrame)]: undefined
//       },
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(shapeMode)]: true,
//       [Symbol(kCapture)]: false,
//       [Symbol(kSetNoDelay)]: false,
//       [Symbol(kSetKeepAlive)]: true,
//       [Symbol(kSetKeepAliveInitialDelay)]: 1,
//       [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0,
//       [Symbol(connect-options)]: [Object]
//     },
//     [Symbol(kOutHeaders)]: [Object: null prototype] {
//       accept: [Array],
//       'content-type': [Array],
//       'x-rapidapi-key': [Array],
//       'x-rapidapi-host': [Array],
//       'user-agent': [Array],
//       'accept-encoding': [Array],
//       host: [Array]
//     },
//     [Symbol(errored)]: null,
//     [Symbol(kHighWaterMark)]: 16384,
//     [Symbol(kRejectNonStandardBodyWrites)]: false,
//     [Symbol(kUniqueHeaders)]: null
//   },
//   data: { submissions: [ [Object], [Object] ] }
// }


//FOLLOWING IS THE data.submissions ARRAY:-

// submissions=[
//   {
//     source_code: "const fs = require('fs');\n" +
//       "const input = fs.readFileSync(0,'utf8').trim().split('\\n');\n" +
//       'const nums = JSON.parse(input[0]);\n' +
//       'const target = Number(input[1]);\n' +
//       '\n' +
//       'function twoSum(nums, target) {\n' +
//       '  const map = new Map();\n' +
//       '  for (let i = 0; i < nums.length; i++) {\n' +
//       '    const complement = target - nums[i];\n' +
//       '    if (map.has(complement)) {\n' +
//       '      return [map.get(complement), i];\n' +
//       '    }\n' +
//       '    map.set(nums[i], i);\n' +
//       '  }\n' +
//       '}\n' +
//       '\n' +
//       'console.log(JSON.stringify(twoSum(nums, target)));',
//     language_id: 63,
//     stdin: '[2,7,11,15]\n9',
//     expected_output: '[0,1]',
//     stdout: '[0,1]\n',
//     status_id: 3,
//     created_at: '2026-03-24T15:54:59.580Z',
//     finished_at: '2026-03-24T15:54:59.873Z',
//     time: '0.023',
//     memory: 7360,
//     stderr: null,
//     token: 'a6c47f65-dbc6-4f94-a300-44aec1ff59d4',
//     number_of_runs: 1,
//     cpu_time_limit: '5.0',
//     cpu_extra_time: '1.0',
//     wall_time_limit: '10.0',
//     memory_limit: 256000,
//     stack_limit: 64000,
//     max_processes_and_or_threads: 128,
//     enable_per_process_and_thread_time_limit: false,
//     enable_per_process_and_thread_memory_limit: false,
//     max_file_size: 5120,
//     compile_output: null,
//     exit_code: 0,
//     exit_signal: null,
//     message: null,
//     wall_time: '0.044',
//     compiler_options: null,
//     command_line_arguments: null,
//     redirect_stderr_to_stdout: false,
//     callback_url: null,
//     additional_files: null,
//     enable_network: false,
//     post_execution_filesystem: 'UEsDBBQACAAIAOB+eFwAAAAAAAAAAMUBAAAJABwAc2NyaXB0LmpzVVQJAAPTs8Jp07PCaXV4CwABBOgDAAAE6AMAAG2QPU/DMBRF9/yKt8VWixU2pMDKgEQZMoYOJtipJX/hD1UVyn/n2U0oA4st+Z17/HQnZ2MCGeEJgvjKKgjSytjSvpnqRFmfEw5lZEHwz2elxXCxE+n2bU7yoaUsBWUIZdFrlUj7bm9Zm03xvgxvB+Z5iIJU29gdf5HEwyyK/5DNhwgrcF+ARmY7JeUspLMbsiFFt18TFL4bgKvDcI8CK87wyj3BJIB0AYhGscJJ1+P1WLdhWtg5nfBht7sqNsnkjNfCCFuWWbe6q5lRHfsKKgkE/2InHskNp5sHsMCUg4WxQJj/C+1hsyz1LEhEZP0Ax3XvpVma2ozTgmk3k9pdxIrtrOSF/NcEpf0PUEsHCJiDBd0KAQAAxQEAAFBLAQIeAxQACAAIAOB+eFyYgwXdCgEAAMUBAAAJABgAAAAAAAEAAACkgQAAAABzY3JpcHQuanNVVAUAA9Ozwml1eAsAAQToAwAABOgDAABQSwUGAAAAAAEAAQBPAAAAXQEAAAAA',
//     status: { id: 3, description: 'Accepted' },
//     language: { id: 63, name: 'JavaScript (Node.js 12.14.0)' }
//   },
//   {
//     source_code: "const fs = require('fs');\n" +
//       "const input = fs.readFileSync(0,'utf8').trim().split('\\n');\n" +
//       'const nums = JSON.parse(input[0]);\n' +
//       'const target = Number(input[1]);\n' +
//       '\n' +
//       'function twoSum(nums, target) {\n' +
//       '  const map = new Map();\n' +
//       '  for (let i = 0; i < nums.length; i++) {\n' +
//       '    const complement = target - nums[i];\n' +
//       '    if (map.has(complement)) {\n' +
//       '      return [map.get(complement), i];\n' +
//       '    }\n' +
//       '    map.set(nums[i], i);\n' +
//       '  }\n' +
//       '}\n' +
//       '\n' +
//       'console.log(JSON.stringify(twoSum(nums, target)));',
//     language_id: 63,
//     stdin: '[3,2,4]\n6',
//     expected_output: '[1,2]',
//     stdout: '[1,2]\n',
//     status_id: 3,
//     created_at: '2026-03-24T15:54:59.583Z',
//     finished_at: '2026-03-24T15:54:59.872Z',
//     time: '0.022',
//     memory: 7836,
//     stderr: null,
//     token: 'b174af70-d427-4b6b-9140-ad2701b185fa',
//     number_of_runs: 1,
//     cpu_time_limit: '5.0',
//     cpu_extra_time: '1.0',
//     wall_time_limit: '10.0',
//     memory_limit: 256000,
//     stack_limit: 64000,
//     max_processes_and_or_threads: 128,
//     enable_per_process_and_thread_time_limit: false,
//     enable_per_process_and_thread_memory_limit: false,
//     max_file_size: 5120,
//     compile_output: null,
//     exit_code: 0,
//     exit_signal: null,
//     message: null,
//     wall_time: '0.042',
//     compiler_options: null,
//     command_line_arguments: null,
//     redirect_stderr_to_stdout: false,
//     callback_url: null,
//     additional_files: null,
//     enable_network: false,
//     post_execution_filesystem: 'UEsDBBQACAAIAOB+eFwAAAAAAAAAAMUBAAAJABwAc2NyaXB0LmpzVVQJAAPTs8Jp07PCaXV4CwABBOgDAAAE6AMAAG2QPU/DMBRF9/yKt8VWixU2pMDKgEQZMoYOJtipJX/hD1UVyn/n2U0oA4st+Z17/HQnZ2MCGeEJgvjKKgjSytjSvpnqRFmfEw5lZEHwz2elxXCxE+n2bU7yoaUsBWUIZdFrlUj7bm9Zm03xvgxvB+Z5iIJU29gdf5HEwyyK/5DNhwgrcF+ARmY7JeUspLMbsiFFt18TFL4bgKvDcI8CK87wyj3BJIB0AYhGscJJ1+P1WLdhWtg5nfBht7sqNsnkjNfCCFuWWbe6q5lRHfsKKgkE/2InHskNp5sHsMCUg4WxQJj/C+1hsyz1LEhEZP0Ax3XvpVma2ozTgmk3k9pdxIrtrOSF/NcEpf0PUEsHCJiDBd0KAQAAxQEAAFBLAQIeAxQACAAIAOB+eFyYgwXdCgEAAMUBAAAJABgAAAAAAAEAAACkgQAAAABzY3JpcHQuanNVVAUAA9Ozwml1eAsAAQToAwAABOgDAABQSwUGAAAAAAEAAQBPAAAAXQEAAAAA',
//     status: { id: 3, description: 'Accepted' },
//     language: { id: 63, name: 'JavaScript (Node.js 12.14.0)' }
//   }
// ]
