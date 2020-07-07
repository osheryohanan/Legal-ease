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
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsController = void 0;
var express_validator_1 = require("express-validator");
var comments_model_1 = require("../model/comments.model");
var commentsController = /** @class */ (function () {
    function commentsController() {
    }
    commentsController.prototype.addComment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var comment, commnetModel, error;
            return __generator(this, function (_a) {
                // userGuard
                try {
                    comment = {
                        user: req.userID,
                        lawyer: req.body.laywerID,
                        text: req.body.text || '',
                        rating: req.body.rating
                    };
                    commnetModel = new comments_model_1.Comments(comment);
                    commnetModel.save();
                    res.status(200).json({
                        type: 'success',
                        message: "We are successful save your comment!",
                    });
                }
                catch (err) {
                    error = {
                        status: 500,
                        message: "Error when saving the comment",
                        type: 'DataBasing',
                    };
                    return [2 /*return*/, res.status(error.status).send(error)];
                }
                return [2 /*return*/];
            });
        });
    };
    commentsController.prototype.getCommentForLaywer = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, error, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        errors = express_validator_1.validationResult(req);
                        if (!errors.isEmpty()) {
                            error = {
                                status: 400,
                                message: "We need to specified all attributes",
                                type: 'Requirement',
                                all: errors.array()
                            };
                            return [2 /*return*/, res.status(error.status).send(error)];
                        }
                        _b = (_a = res).json;
                        return [4 /*yield*/, comments_model_1.Comments.find({ laywer: req.body.laywerID })];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    commentsController.prototype.getAllComment = function (req, res) {
        var errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            var error = {
                status: 400,
                message: "We need to specified all attributes",
                type: 'Requirement',
                all: errors.array()
            };
            return res.status(error.status).send(error);
        }
    };
    return commentsController;
}());
exports.commentsController = commentsController;
//# sourceMappingURL=comments.controller.js.map