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
var zoomapi_controller_1 = require("./controller/zoomapi.controller");
var lawyer_route_1 = require("./routes/lawyer.route");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_route_1 = require("./routes/user.route");
var comments_route_1 = require("./routes/comments.route");
var db_1 = require("./config/db");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
require("dotenv").config();
var app = express_1.default();
//json -POST
app.use(body_parser_1.default.json());
//urlencoded -POST
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use(cors_1.default());
db_1.InitiateMongoServer();
app.use("/user", new user_route_1.userRoute().router);
app.use("/lawyer", new lawyer_route_1.lawyerRoute().router);
app.use("/comments", new comments_route_1.commentsRoute().router);
var test = new zoomapi_controller_1.zoomApiController();
app.get('/test/api', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tokens, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, test.getAccessToken(req.query.code)];
            case 1:
                tokens = _a.sent();
                return [4 /*yield*/, test.checkuser(tokens.access_token)];
            case 2:
                user = _a.sent();
                res.send({ user: user, tokens: tokens });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.send({ error: 'true', type: error_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/test/refresh_token', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tokens, sawait, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, test.refreshAccessToken(req.query.refresh_token)];
            case 1:
                tokens = _a.sent();
                return [4 /*yield*/, test.saveRefreshToken(tokens, '5ed3d805f399e42330d7f885')];
            case 2:
                sawait = _a.sent();
                res.send({ tokens: tokens, sawait: sawait });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.send({ error: 'true', type: error_2 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/test/meeting', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var meeing, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, test.addMeeting()];
            case 1:
                meeing = _a.sent();
                res.send({ meeing: meeing });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.send({ error: 'true', type: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/test/mymeeting', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var meeing, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, test.myMeeting(req.query.access_token)];
            case 1:
                meeing = _a.sent();
                res.send({ meeing: meeing });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.send({ error: 'true', type: error_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
var website = express_1.default();
website.get('*', function (req, res) {
    try {
        if (fs_1.default.existsSync(path_1.default.join(__dirname, "../../", "front/dist/lease-ease/index.html"))) {
            var allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg', '.gif', '.map'];
            // if (req.ip != '::ffff:37.142.6.113') {
            //   return res.send('you are unauthorized to access this resource from the ip '+req.ip);
            // }
            if (allowedExt.filter(function (ext) { return req.url.indexOf(ext) > 0; }).length > 0) {
                return res.sendFile(path_1.default.join(__dirname, "../../", 'front/dist/lease-ease/', "" + req.url));
            }
            else {
                return res.sendFile(path_1.default.join(__dirname, "../../", "front/dist/lease-ease/index.html"));
            }
        }
        throw "err";
    }
    catch (error) {
        res.send("can't resolve front");
    }
});
app.use('/', website);
app.all("*", function (req, res) {
    var error = {
        status: 404,
        message: "We can't access to this path",
        type: "Invalid Path",
    };
    res.status(error.status).send(error);
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log("Listen on port " + PORT);
});
//# sourceMappingURL=index.js.map