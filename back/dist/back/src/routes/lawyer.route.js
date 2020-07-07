"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lawyerRoute = void 0;
var express_1 = __importDefault(require("express"));
var lawyer_controller_1 = require("../controller/lawyer.controller");
var express_validator_1 = require("express-validator");
var multer_1 = __importDefault(require("multer"));
var uploadMulter = multer_1.default();
var all_middleware_1 = require("../middleware/all.middleware");
var authentification_middleware_1 = require("../middleware/authentification.middleware");
var lawyerRoute = /** @class */ (function () {
    function lawyerRoute() {
        this.router = express_1.default.Router();
        this.controller = new lawyer_controller_1.lawyerController();
        this.initializeRoutes();
    }
    lawyerRoute.prototype.initializeRoutes = function () {
        this.router.post('/create', [uploadMulter.none(), all_middleware_1.checkDbConnection, express_validator_1.body('email', 'Please enter you email').notEmpty(), express_validator_1.body('password', 'Please enter you password').notEmpty(), express_validator_1.body('lawyerNum', 'Please enter you laywerNum').notEmpty(), express_validator_1.body('firstname', 'Please enter you firstname').notEmpty(), express_validator_1.body('lastname', 'Please enter you lastname').notEmpty(), express_validator_1.body('phone', 'Please enter you phone').notEmpty()], this.controller.signup);
        this.router.post('/login', [uploadMulter.none(), all_middleware_1.checkDbConnection, express_validator_1.body("email", "Please enter a valid email").isEmail(), express_validator_1.body('password').notEmpty()], this.controller.login);
        this.router.post('/loginG', [all_middleware_1.checkDbConnection, express_validator_1.check('tokenid', 'Please enter you gid').notEmpty()], this.controller.loginGid);
        this.router.post('/profileImageUpdate', [authentification_middleware_1.auth, all_middleware_1.checkDbConnection, authentification_middleware_1.checkLawyer, all_middleware_1.upload.single('photo')], this.controller.uploadImage);
        this.router.post('/me', [authentification_middleware_1.auth, all_middleware_1.checkDbConnection, authentification_middleware_1.checkLawyer], this.controller.me);
        this.router.put('/update', [authentification_middleware_1.auth, all_middleware_1.checkDbConnection, authentification_middleware_1.checkLawyer, express_validator_1.body('category').custom(function (value) { return Array.isArray(value); })], this.controller.update);
        this.router.delete('/remove/:id', [authentification_middleware_1.auth], this.controller.delete);
        this.router.get('/category', [all_middleware_1.checkDbConnection], this.controller.getCategory);
        this.router.get('/bycategory', [authentification_middleware_1.auth, all_middleware_1.checkDbConnection, express_validator_1.query('id', 'Please enter an ids').notEmpty()], this.controller.getbycategory);
        this.router.get('/getinfo/:id', [authentification_middleware_1.auth, all_middleware_1.checkDbConnection, authentification_middleware_1.checkUser, express_validator_1.param('id', 'Please enter an id').notEmpty()], this.controller.getlawyerbyid);
        this.router.get('/getavailability/:id', [authentification_middleware_1.auth, all_middleware_1.checkDbConnection, authentification_middleware_1.checkUser, express_validator_1.param('id', 'Please enter an id').notEmpty()], this.controller.getAvailability);
    };
    return lawyerRoute;
}());
exports.lawyerRoute = lawyerRoute;
//# sourceMappingURL=lawyer.route.js.map