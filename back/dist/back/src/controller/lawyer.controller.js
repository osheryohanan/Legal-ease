"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.lawyerController = void 0;
var express_validator_1 = require("express-validator");
var bcrypt = __importStar(require("bcryptjs"));
var jwt = __importStar(require("jsonwebtoken"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var google_auth_library_1 = require("google-auth-library");
var lawyer_model_1 = require("../model/lawyer.model");
var category_model_1 = require("./../model/category.model");
var privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, '../../', 'private.key'));
var default_availability_1 = require("../../../front/src/app/lawyer/pages/availability/default.availability");
var mongoose_1 = __importDefault(require("mongoose"));
var lawyerController = /** @class */ (function () {
    function lawyerController() {
    }
    lawyerController.prototype.signup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, error, _a, email, password, firstname, lastname, phone, lawyerNum, gid, c, msg, error, salt, lawyer, _b, lawyerModel, payload, _c, _d, _e, error_1, error;
            return __generator(this, function (_f) {
                switch (_f.label) {
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
                        _a = req.body, email = _a.email, password = _a.password, firstname = _a.firstname, lastname = _a.lastname, phone = _a.phone, lawyerNum = _a.lawyerNum, gid = _a.gid;
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, lawyer_model_1.Lawyer.findOne({
                                "email": email
                            })];
                    case 2:
                        c = _f.sent();
                        if (c) {
                            msg = [];
                            msg.push('Email Already Exists');
                            error = {
                                status: 400,
                                message: "The email address is already in use",
                                type: 'Requirement',
                            };
                            return [2 /*return*/, res.status(error.status).send(error)];
                        }
                        return [4 /*yield*/, bcrypt.genSalt(10)];
                    case 3:
                        salt = _f.sent();
                        _b = {
                            firstname: firstname,
                            lastname: lastname,
                            phone: phone
                        };
                        return [4 /*yield*/, bcrypt.hash(password, salt)];
                    case 4:
                        lawyer = (_b.password = _f.sent(),
                            _b.email = email,
                            _b.lawyerNum = lawyerNum,
                            _b);
                        lawyerModel = new lawyer_model_1.Lawyer(lawyer);
                        return [4 /*yield*/, lawyerModel.save()];
                    case 5:
                        _f.sent();
                        payload = {
                            user: {
                                type: 'lawyer',
                                id: lawyerModel._id
                            }
                        };
                        _d = (_c = res.status(200)).json;
                        _e = {
                            type: 'success',
                            message: "We are successful create profile for " + email + "!"
                        };
                        return [4 /*yield*/, jwt.sign(payload, privateKey, {
                                expiresIn: 10000,
                                algorithm: 'RS256'
                            })];
                    case 6:
                        _d.apply(_c, [(_e.token = _f.sent(),
                                _e)]);
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _f.sent();
                        error_1 = {
                            status: 500,
                            message: "We occured an error during saving, please try again later.",
                            type: 'DataBasing',
                            all: error_1
                        };
                        return [2 /*return*/, res.status(error_1.status).send(error_1)];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    lawyerController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, error, _a, email, password, longtime, user, error, isMatch, error, payload, expiresIn, e_1, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
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
                        _a = req.body, email = _a.email, password = _a.password, longtime = _a.longtime;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, lawyer_model_1.Lawyer.findOne({
                                email: email
                            })];
                    case 2:
                        user = _b.sent();
                        if (!user) {
                            error = {
                                status: 400,
                                message: "You didn't have an account! Please register.",
                                type: 'Anth Error',
                            };
                            return [2 /*return*/, res.status(error.status).send(error)];
                        }
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 3:
                        isMatch = _b.sent();
                        if (!isMatch) {
                            error = {
                                status: 400,
                                message: "The password is incorrect, please try again.",
                                type: 'Anth Error',
                            };
                            return [2 /*return*/, res.status(error.status).send(error)];
                        }
                        payload = {
                            user: {
                                type: 'lawyer',
                                id: user.id
                            }
                        };
                        expiresIn = '1d';
                        if (longtime)
                            expiresIn = '30d';
                        return [2 /*return*/, jwt.sign(payload, privateKey, {
                                expiresIn: expiresIn,
                                algorithm: 'RS256',
                            }, function (err, token) {
                                if (err)
                                    throw err;
                                return res.status(200).json({
                                    status: 200,
                                    token: token
                                });
                            })];
                    case 4:
                        e_1 = _b.sent();
                        error = {
                            status: 400,
                            message: "We have encountered a bug, please try again later..",
                            type: 'BUG',
                        };
                        return [2 /*return*/, res.status(error.status).send(error)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    lawyerController.prototype.loginGid = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, error, client, ticket, guser, gid, user, error, payload, e_2, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
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
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        client = new google_auth_library_1.OAuth2Client(process.env.GOOGLEID);
                        return [4 /*yield*/, client.verifyIdToken({
                                idToken: req.body.tokenid,
                                audience: process.env.GOOGLEID,
                            })];
                    case 2:
                        ticket = _a.sent();
                        guser = ticket.getPayload();
                        gid = guser['sub'];
                        return [4 /*yield*/, lawyer_model_1.Lawyer.findOne({
                                gid: gid
                            })];
                    case 3:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 6];
                        return [4 /*yield*/, lawyer_model_1.Lawyer.findOne({
                                email: guser['email']
                            })];
                    case 4:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 6];
                        return [4 /*yield*/, lawyer_model_1.Lawyer.findByIdAndUpdate(user._id, {
                                $set: {
                                    gid: gid
                                }
                            })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!user) {
                            error = {
                                status: 400,
                                message: "You didn't have an account! Please register.",
                                type: 'Anth Error',
                            };
                            return [2 /*return*/, res.status(error.status).send(error)];
                        }
                        payload = {
                            user: {
                                type: 'lawyer',
                                id: user._id
                            }
                        };
                        return [2 /*return*/, jwt.sign(payload, privateKey, {
                                expiresIn: 10000,
                                algorithm: 'RS256',
                            }, function (err, token) {
                                if (err)
                                    throw err;
                                return res.status(200).json({
                                    status: 200,
                                    token: token
                                });
                            })];
                    case 7:
                        e_2 = _a.sent();
                        error = {
                            status: 400,
                            message: "We have encountered a bug, please try again later..",
                            type: 'BUG',
                        };
                        return [2 /*return*/, res.status(error.status).send(error)];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    lawyerController.prototype.update = function (req, res) {
        if (req.body.email)
            delete req.body.email;
        if (req.body.password)
            delete req.body.password;
        if (req.body.meetingDiary)
            delete req.body.meetingDiary;
        if (req.body._id)
            delete req.body._id;
        if (req.body.imagePath)
            delete req.body.imagePath;
        if (req.body.category) {
            var category = req.body.category;
            req.body.category = category.map(function (x) { return mongoose_1.default.Types.ObjectId(x._id); });
        }
        lawyer_model_1.Lawyer.findByIdAndUpdate(req.user._id, {
            $set: req.body
        }, function (err, product) {
            if (err) {
                var error = {
                    status: 500,
                    message: "We occured an error during saving, please try again later.",
                    type: 'DataBasing',
                    all: err
                };
                return res.status(error.status).send(error);
            }
            res.json(product);
        });
    };
    ;
    lawyerController.prototype.getDetails = function (req, res) {
        lawyer_model_1.Lawyer.findById(req.params.id, function (err, user) {
            if (err) {
                // handle
            }
            res.send(user);
        });
    };
    ;
    lawyerController.prototype.me = function (req, res) {
        lawyer_model_1.Lawyer.findById(req.user._id, '-password').populate('category').exec(function (err, user) {
            if (err) {
                var error = {
                    status: 400,
                    message: "An error was occured , please try again later.",
                    type: 'DataBasing',
                };
                return res.status(error.status).send(error);
            }
            res.status(200).json(user);
        });
    };
    ;
    lawyerController.prototype.delete = function (req, res) {
        lawyer_model_1.Lawyer.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                // handle
            }
            res.status(200).send('Deleted successfully!');
        });
    };
    ;
    lawyerController.prototype.uploadImage = function (req, res) {
        try {
            if (req.file) {
                lawyer_model_1.Lawyer.findById(req.user._id, function (err, doc) {
                    if (err) {
                        var error = {
                            status: 400,
                            message: "error when saving the image",
                            type: 'DataBasing',
                        };
                        return res.status(error.status).send(error);
                    }
                    doc.imagePath = req.file.filename;
                    doc.save(function (err) {
                        if (!err) {
                            res.status(200).json({
                                success: true,
                                filename: req.file.filename
                            });
                        }
                        else {
                            var error = {
                                status: 400,
                                message: "error when saving the image",
                                type: 'DataBasing',
                            };
                            return res.status(error.status).send(error);
                        }
                    });
                });
            }
            else {
                var error = {
                    status: 400,
                    message: "no image was received",
                    type: 'Requirement',
                };
                return res.status(error.status).send(error);
            }
        }
        catch (error) {
            var error = {
                status: 400,
                message: "no image was received",
                type: 'Requirement',
            };
            return res.status(error.status).send(error);
        }
    };
    lawyerController.prototype.GenerateResetPassword = function (req, res) {
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
        try {
            var payload = {
                email: req.body.email
            };
            jwt.sign(payload, privateKey, {
                expiresIn: 10000,
                algorithm: 'RS256',
            }, function (err, token) {
                if (err)
                    throw err;
                //send email to the client
                //https://stackoverflow.com/questions/48075688/how-to-decode-the-jwt-encoded-token-payload-on-client-side-in-angular-5
                return res.status(200).json({
                    status: 200,
                    message: 'An email has been sent to you. please follow the instructions to renew your password.'
                });
            });
        }
        catch (error) {
            var error = {
                status: 400,
                message: "We have encountered a bug, please try again later..",
                type: 'BUG',
            };
            return res.status(error.status).send(error);
        }
    };
    lawyerController.prototype.ResetPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, error, cert, decoded, salt, _a, _b, _c, _d, _e, error_2, error;
            return __generator(this, function (_f) {
                switch (_f.label) {
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
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 4, , 5]);
                        cert = fs_1.default.readFileSync(path_1.default.join(__dirname, '../../', 'public.key'));
                        decoded = jwt.verify(req.body.token, cert);
                        return [4 /*yield*/, bcrypt.genSalt(10)];
                    case 2:
                        salt = _f.sent();
                        _b = (_a = lawyer_model_1.Lawyer).findOneAndUpdate;
                        _c = [{
                                email: decoded.email
                            }];
                        _d = {};
                        _e = {};
                        return [4 /*yield*/, bcrypt.hash(req.body.password, salt)];
                    case 3:
                        _b.apply(_a, _c.concat([(_d.$set = (_e.password = _f.sent(),
                                _e),
                                _d), function (err, product) {
                                if (err) {
                                    var error = {
                                        status: 500,
                                        message: "We occured an error during saving, please try again later.",
                                        type: 'DataBasing',
                                        all: err
                                    };
                                    return res.status(error.status).send(error);
                                }
                                res.json({
                                    status: 'success',
                                    message: 'Your password has been changed'
                                });
                            }]));
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _f.sent();
                        error_2 = {
                            status: 500,
                            message: error_2.name == 'TokenExpiredError' ? 'Your link has expired please login again' : "The token is invalid",
                            type: 'Requirement'
                        };
                        return [2 /*return*/, res.status(error_2.status).send(error_2)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    lawyerController.prototype.getCategory = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_a) {
                try {
                    category_model_1.Category.find({}, function (err, product) {
                        res.send(product);
                    });
                    //    res.send(await Category.find());
                }
                catch (err) {
                    error = {
                        status: 500,
                        message: "We occured an error during saving, please try again later.",
                        type: 'DataBasing',
                    };
                    return [2 /*return*/, res.status(error.status).send(error)];
                }
                return [2 /*return*/];
            });
        });
    };
    lawyerController.prototype.addcategory = function (req, res) {
        // Lawyer.find({ _id: "5ed3d805f399e42330d7f885" },(err,pro)=>{res.send(pro)})$
        lawyer_model_1.Lawyer.updateOne({ _id: "5ed3d805f399e42330d7f885" }, { $addToSet: { category: [mongoose_1.default.Types.ObjectId("5ee12cc9d8232f45e4ebd52f")] } }, function (err, pro) {
            res.send(pro);
        });
    };
    lawyerController.prototype.deletecategory = function (req, res) {
        lawyer_model_1.Lawyer.updateOne({ _id: "5ed3d805f399e42330d7f885" }, { $pull: { category: mongoose_1.default.Types.ObjectId("5ee12cc9d8232f45e4ebd52e") } }, function (err, pro) {
            res.send(pro);
        });
    };
    lawyerController.prototype.getbycategory = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, error, ids, lawyer, index, err_1, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
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
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        ids = req.query.id.toString();
                        return [4 /*yield*/, lawyer_model_1.Lawyer.find({ category: { "$in": [ids] } }).populate('category').select('-password -__v -zoomDetails')];
                    case 2:
                        lawyer = _a.sent();
                        for (index = 0; index < lawyer.length; index++) {
                            lawyer[index].set('rating', {
                                score: 4.1,
                                all: 343
                            }, { strict: false });
                        }
                        res.send(lawyer);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        error = {
                            status: 500,
                            message: "We occured an error during saving, please try again later.",
                            type: 'DataBasing',
                            all: err_1
                        };
                        return [2 /*return*/, res.status(error.status).send(error)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    lawyerController.prototype.getlawyerbyid = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, validID, error, user, error, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errors = express_validator_1.validationResult(req);
                        validID = mongoose_1.default.Types.ObjectId.isValid(req.params.id);
                        if (!errors.isEmpty() || !validID) {
                            error = {
                                status: 400,
                                message: validID ? "We need to specified all attributes" : 'Lawyer id not valid',
                                type: 'Requirement',
                                all: errors.array()
                            };
                            return [2 /*return*/, res.status(error.status).send(error)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, lawyer_model_1.Lawyer.findOne({
                                _id: mongoose_1.default.Types.ObjectId(req.params.id)
                            }).select('-password -zoomDetails -birstday').populate('category')];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            error = {
                                status: 400,
                                message: "Lawyer not exist!.",
                                type: 'Anth Error',
                            };
                            return [2 /*return*/, res.status(error.status).send(error)];
                        }
                        if (!user.imagePath)
                            user.set('imagePath', '/assets/img/profile.png', { strict: false });
                        user.firstname = user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1);
                        user.lastname = user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1);
                        user.set('rating', {
                            score: 4.1,
                            all: 343
                        }, { strict: false });
                        return [2 /*return*/, res.send(user)];
                    case 3:
                        error_3 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    lawyerController.prototype.getAvailability = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, validID, error, user, error, availability, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errors = express_validator_1.validationResult(req);
                        validID = mongoose_1.default.Types.ObjectId.isValid(req.params.id);
                        if (!errors.isEmpty() || !validID) {
                            error = {
                                status: 400,
                                message: validID ? "We need to specified all attributes" : 'Lawyer id not valid',
                                type: 'Requirement',
                                all: errors.array()
                            };
                            return [2 /*return*/, res.status(error.status).send(error)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, lawyer_model_1.Lawyer.findOne({
                                _id: mongoose_1.default.Types.ObjectId(req.params.id)
                            }).select('availability')];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            error = {
                                status: 400,
                                message: "Lawyer not exist!.",
                                type: 'Anth Error',
                            };
                            return [2 /*return*/, res.status(error.status).send(error)];
                        }
                        availability = user.availability || default_availability_1.availability_default;
                        result = this.getAv(availability);
                        return [2 /*return*/, res.json(result)];
                    case 3:
                        error_4 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    lawyerController.prototype.getAv = function (availability) {
        var resultat = {};
        Object.keys(availability).forEach(function (key) {
            resultat[key] = [];
            availability[key].forEach(function (element, index) {
                if (element) {
                    var result = "";
                    var decimalTime = (index * 30) / 60;
                    decimalTime = decimalTime * 60 * 60;
                    var hours = Math.floor((decimalTime / (60 * 60)));
                    decimalTime = decimalTime - (hours * 60 * 60);
                    var minutes = Math.floor((decimalTime / 60));
                    if (hours < 10) {
                        result += "0";
                    }
                    result += hours + ':';
                    if (minutes < 10) {
                        result += "0";
                    }
                    result += minutes;
                    resultat[key].push(result);
                }
            });
        });
        return resultat;
    };
    return lawyerController;
}());
exports.lawyerController = lawyerController;
//# sourceMappingURL=lawyer.controller.js.map