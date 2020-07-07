"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controller/user.controller");
var express_validator_1 = require("express-validator");
var multer_1 = __importDefault(require("multer"));
var uploadMulter = multer_1.default();
var all_middleware_1 = require("../middleware/all.middleware");
var authentification_middleware_1 = require("../middleware/authentification.middleware");
var userRoute = /** @class */ (function () {
    function userRoute() {
        this.router = express_1.default.Router();
        this.controller = new user_controller_1.userController();
        this.initializeRoutes();
    }
    userRoute.prototype.initializeRoutes = function () {
        this.router.post('/create', [uploadMulter.none(), all_middleware_1.checkDbConnection, express_validator_1.body('email', 'Please enter you email').notEmpty(), express_validator_1.body('password', 'Please enter you password').notEmpty(), express_validator_1.body('firstname', 'Please enter you firstname').notEmpty(), express_validator_1.body('lastname', 'Please enter you lastname').notEmpty(), express_validator_1.body('phone', 'Please enter you phone').notEmpty()], this.controller.signup);
        this.router.post('/login', [uploadMulter.none(), all_middleware_1.checkDbConnection, express_validator_1.body("email", "Please enter a valid email").isEmail(), express_validator_1.body('password').notEmpty()], this.controller.login);
        this.router.post('/loginG', [all_middleware_1.checkDbConnection, express_validator_1.check('tokenid', 'Please enter you gid').notEmpty()], this.controller.loginGid);
        this.router.post('/profileImageUpdate', [authentification_middleware_1.auth, all_middleware_1.checkDbConnection, authentification_middleware_1.checkUser, all_middleware_1.upload.single('photo')], this.controller.uploadImage);
        this.router.post('/me', [authentification_middleware_1.auth, all_middleware_1.checkDbConnection, authentification_middleware_1.checkUser], this.controller.me);
        this.router.put('/update', [authentification_middleware_1.auth, all_middleware_1.checkDbConnection, authentification_middleware_1.checkUser], this.controller.update);
        this.router.delete('/remove/:id', [authentification_middleware_1.auth], this.controller.delete);
    };
    return userRoute;
}());
exports.userRoute = userRoute;
//# sourceMappingURL=user.route.js.map