"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lawyer = void 0;
var mongoose_1 = require("mongoose");
var lawyerSchema = new mongoose_1.Schema({
    email: { type: mongoose_1.Schema.Types.String, required: true },
    password: { type: mongoose_1.Schema.Types.String, required: true },
    firstname: { type: mongoose_1.Schema.Types.String, required: true },
    lastname: { type: mongoose_1.Schema.Types.String, required: true },
    lawyerNum: { type: mongoose_1.Schema.Types.String, required: true },
    address: { type: mongoose_1.Schema.Types.String },
    phone: { type: mongoose_1.Schema.Types.String, required: true },
    companyPhone: { type: mongoose_1.Schema.Types.String, },
    imagePath: { type: mongoose_1.Schema.Types.String, default: '/assets/img/profile.png' },
    birstday: { type: mongoose_1.Schema.Types.Date },
    createdAt: { type: Date, default: Date.now() },
    gid: { type: mongoose_1.Schema.Types.String },
    morInfo: { type: mongoose_1.Schema.Types.String },
    zoomDetails: { type: Object },
    availability: { type: Object },
    category: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'categories' }],
});
exports.Lawyer = mongoose_1.model('lawyers', lawyerSchema);
//# sourceMappingURL=lawyer.model.js.map