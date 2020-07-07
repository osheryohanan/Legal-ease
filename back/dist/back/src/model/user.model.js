"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    email: { type: mongoose_1.Schema.Types.String, required: true },
    password: { type: mongoose_1.Schema.Types.String, required: true },
    firstname: { type: mongoose_1.Schema.Types.String, required: true },
    lastname: { type: mongoose_1.Schema.Types.String, required: true },
    birstday: { type: mongoose_1.Schema.Types.Date },
    phone: { type: mongoose_1.Schema.Types.String, required: true },
    imagePath: { type: mongoose_1.Schema.Types.String, required: true, default: 'default.logo' },
    meetingDiary: [{ type: mongoose_1.Schema.Types.ObjectId }],
    zoomDetails: {},
    createdAt: { type: Date, default: Date.now() },
    gid: { type: mongoose_1.Schema.Types.String },
    facebook: { type: mongoose_1.Schema.Types.String },
});
exports.User = mongoose_1.model('users', userSchema);
//# sourceMappingURL=user.model.js.map