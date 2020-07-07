"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
var mongoose_1 = require("mongoose");
var commentsSchema = new mongoose_1.Schema({
    user: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'users' }],
    lawyer: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'lawyers' }],
    text: { type: mongoose_1.Schema.Types.String },
    rating: { type: mongoose_1.Schema.Types.Number, required: true },
});
exports.Comments = mongoose_1.model('comments', commentsSchema);
//# sourceMappingURL=comments.model.js.map