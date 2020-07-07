"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.checkDbConnection = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
exports.checkDbConnection = function (req, res, next) {
    if (mongoose_1.default.connection.readyState == 1) {
        return next();
    }
    var error = {
        status: 500,
        message: "Error server please try later",
        type: 'DataBasing'
    };
    return res.status(error.status).send(error);
};
exports.upload = multer_1.default({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path_1.default.join(__dirname, '../../', 'uploads/images'));
        },
        filename: function (req, file, cb) {
            if (req.user) {
                var filename = req.user._id + path_1.default.extname(file.originalname);
                return cb(null, filename);
            }
            cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
        }
    })
});
//# sourceMappingURL=all.middleware.js.map