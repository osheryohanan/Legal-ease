"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema({
    name: { type: mongoose_1.Schema.Types.String, required: true, }
});
exports.Category = mongoose_1.model('categories', categorySchema);
//# sourceMappingURL=category.model.js.map