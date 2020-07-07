"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoomApiController = void 0;
var axios_1 = __importDefault(require("axios"));
var lawyer_model_1 = require("../model/lawyer.model");
// var request=require("request");
var zoomApiController = /** @class */ (function () {
    function zoomApiController() {
        this.CLIENTSERVE = "RDU3TzdOWG1UUEdFYWJsNEF6ZTJROmxZOWdhWDFGVDN4SjNyYWFZUnljWHJhSm9ZUHFocTJ1";
    }
    zoomApiController.prototype.getAccessToken = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var newLocal, options, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newLocal = this.CLIENTSERVE;
                        options = {
                            method: 'POST',
                            url: 'https://api.zoom.us/oauth/token',
                            qs: {
                                grant_type: 'authorization_code',
                                //The code below is a sample authorization code. Replace it with your actual authorization code while making requests.
                                code: code,
                                //The uri below is a sample redirect_uri. Replace it with your actual redirect_uri while making requests.
                                redirect_uri: 'http://localhost:4200'
                            },
                            headers: {
                                /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
                                 **/
                                Authorization: 'Basic RDU3TzdOWG1UUEdFYWJsNEF6ZTJROmxZOWdhWDFGVDN4SjNyYWFZUnljWHJhSm9ZUHFocTJ1'
                            }
                        };
                        return [4 /*yield*/, axios_1.default.request({ method: 'POST', url: options.url, headers: options.headers, params: options.qs })];
                    case 1:
                        res = _a.sent();
                        if (res.data.access_token) {
                            return [2 /*return*/, res.data];
                        }
                        throw res;
                }
            });
        });
    };
    zoomApiController.prototype.checkuser = function (access_token) {
        return __awaiter(this, void 0, void 0, function () {
            var options, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            method: 'GET',
                            url: 'https://api.zoom.us/v2/users/me',
                            headers: {
                                /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
                                 **/
                                Authorization: 'Bearer ' + access_token
                            },
                        };
                        return [4 /*yield*/, axios_1.default.request({ method: 'GET', url: options.url, headers: options.headers })];
                    case 1:
                        res = _a.sent();
                        if (res.data.id) {
                            return [2 /*return*/, res.data];
                        }
                        throw res;
                }
            });
        });
    };
    zoomApiController.prototype.refreshAccessToken = function (refresh_token) {
        return __awaiter(this, void 0, void 0, function () {
            var options, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            method: 'GET',
                            url: 'https://zoom.us/oauth/token',
                            headers: {
                                Authorization: 'Basic  ' + this.CLIENTSERVE
                            },
                            qs: {
                                grant_type: 'refresh_token',
                                refresh_token: refresh_token
                            }
                        };
                        return [4 /*yield*/, axios_1.default.request({ method: 'POST', headers: options.headers, url: options.url, params: options.qs })];
                    case 1:
                        res = _a.sent();
                        if (res.data.access_token) {
                            return [2 /*return*/, res.data];
                        }
                        throw res;
                }
            });
        });
    };
    zoomApiController.prototype.addMeeting = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, form;
            return __generator(this, function (_a) {
                options = {
                    method: 'GET',
                    url: 'https://api.zoom.us/v2/users/me/meetings',
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzUxMiIsInYiOiIyLjAiLCJraWQiOiJjMTE3ZTcxOC1hMjAwLTQzYTgtYWRlMC02YzdiY2JiYTMyZDkifQ.eyJ2ZXIiOiI2IiwiY2xpZW50SWQiOiJENTdPN05YbVRQR0VhYmw0QXplMlEiLCJjb2RlIjoiZFVlNXRQV3dVOV9nX2Q3dU9kTFNVZXo5dEcyWkdOQ01BIiwiaXNzIjoidXJuOnpvb206Y29ubmVjdDpjbGllbnRpZDpENTdPN05YbVRQR0VhYmw0QXplMlEiLCJhdXRoZW50aWNhdGlvbklkIjoiNjAyODUyYjI0MzdkMTRkNmMwMTgwMjBiNjZmYTJmYzYiLCJ1c2VySWQiOiJnX2Q3dU9kTFNVZXo5dEcyWkdOQ01BIiwiZ3JvdXBOdW1iZXIiOjAsImF1ZCI6Imh0dHBzOi8vb2F1dGguem9vbS51cyIsImFjY291bnRJZCI6ImhBY2hrdnhmVHZhNEpaVnRvcXBPWlEiLCJuYmYiOjE1OTE1NTc5NzYsImV4cCI6MTU5MTU2MTU3NiwidG9rZW5UeXBlIjoiYWNjZXNzX3Rva2VuIiwiaWF0IjoxNTkxNTU3OTc2LCJqdGkiOiIwMTE2YmU5Ny0zMGM4LTQxMzktODUwNy1mNjMwYmRkMjE5MzkiLCJ0b2xlcmFuY2VJZCI6NX0.YdaKMk-ZwrSzocuddar47sc41xWBZ1fyWNS1Y4f_DJ80bW5AFBs7Mg-YMPV9ekjSr2EXq69PcXJJoi-HSx0FHg"
                    },
                };
                form = {
                    "topic": "Meeting with LAWER for Client",
                    "type": 2,
                    "start_time": "2020-06-08T19:13:39Z",
                    "duration": 30,
                    "timezone": "Asia/Jerusalem",
                    "password": "legalEase1",
                    "agenda": "qs",
                    "settings": {
                        "host_video": true,
                        "audio": "both",
                        "auto_recording": true,
                    }
                };
                return [2 /*return*/, axios_1.default.request({ method: 'POST', headers: options.headers, url: options.url, data: form })
                        .then(function (response) {
                        return response.data;
                    })
                        .catch(function (error) {
                        throw error;
                    })];
            });
        });
    };
    zoomApiController.prototype.myMeeting = function (accesstoken) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                options = {
                    method: 'GET',
                    url: 'https://api.zoom.us/v2/users/me/meetings',
                    headers: {
                        Authorization: "Bearer " + accesstoken
                    },
                };
                return [2 /*return*/, axios_1.default.request({ method: 'GET', headers: options.headers, url: options.url })
                        .then(function (response) {
                        return response.data;
                    })
                        .catch(function (error) {
                        throw error;
                    })];
            });
        });
    };
    zoomApiController.prototype.saveRefreshToken = function (data, userid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, lawyer_model_1.Lawyer.findByIdAndUpdate(userid, {
                        $set: { zoomDetails: data }
                    }, function (err, d) {
                        if (err) {
                            var error = {
                                status: 500,
                                message: "We occured an error during saving, please try again later.",
                                type: 'DataBasing',
                                all: err
                            };
                            throw error;
                        }
                        return d;
                    })];
            });
        });
    };
    return zoomApiController;
}());
exports.zoomApiController = zoomApiController;
//# sourceMappingURL=zoomapi.controller.js.map