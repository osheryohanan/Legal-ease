"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRoute = void 0;
var express_1 = __importDefault(require("express"));
var comments_controller_1 = require("../controller/comments.controller");
var all_middleware_1 = require("../middleware/all.middleware");
var authentification_middleware_1 = require("../middleware/authentification.middleware");
var express_validator_1 = require("express-validator");
var commentsRoute = /** @class */ (function () {
    function commentsRoute() {
        this.router = express_1.default.Router();
        this.controller = new comments_controller_1.commentsController();
        this.initializeRoutes();
    }
    commentsRoute.prototype.initializeRoutes = function () {
        this.router.post('/laywer', [all_middleware_1.checkDbConnection, express_validator_1.check("laywerID", "Please enter the laywer ID").notEmpty()], this.controller.getCommentForLaywer);
        this.router.post('/add', [all_middleware_1.checkDbConnection, authentification_middleware_1.checkUser,], this.controller.addComment);
    };
    return commentsRoute;
}());
exports.commentsRoute = commentsRoute;
//# sourceMappingURL=comments.route.js.map