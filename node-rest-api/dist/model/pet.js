"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetModel = void 0;
const mongoose_1 = require("mongoose");
const petSchema = new mongoose_1.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    type: {
        type: String,
        enum: ["Dog", "Cat", "Horse", "Other"],
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
}, {
    collection: "pets",
});
exports.PetModel = (0, mongoose_1.model)('Pet', petSchema);
// export default model("Pet", petSchema)
// const Pet = mongoose.model("Pet", petSchema);
// module.exports = {
//   Pet,
// };
//# sourceMappingURL=pet.js.map