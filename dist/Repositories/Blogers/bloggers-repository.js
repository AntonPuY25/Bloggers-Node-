"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloggersRepository = exports.bloggers = void 0;
const db_1 = require("../Db/db");
exports.bloggers = [
    {
        id: 1,
        name: "Dymich",
        youtubeUrl: "https://www.youtube.com/c/ITKAMASUTRA"
    },
];
exports.bloggersRepository = {
    getBloggers() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.bloggersCollection.find({}).toArray();
        });
    },
    setBlogger(newBlogger) {
        return __awaiter(this, void 0, void 0, function* () {
            db_1.bloggersCollection.insertOne(newBlogger);
            return newBlogger;
        });
    },
    getCurrentBlogger(bloggerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentBlogger = db_1.bloggersCollection.findOne({ id: bloggerId });
            if (currentBlogger) {
                return currentBlogger;
            }
            else {
                return null;
            }
        });
    },
    updateCurrentBlogger(newBlogger, bloggerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentBlogger = yield db_1.bloggersCollection.findOne({ id: bloggerId });
            if (currentBlogger) {
                db_1.bloggersCollection.updateOne({ id: bloggerId }, { $set: { name: newBlogger.name, youtubeUrl: newBlogger.youtubeUrl } });
                return newBlogger;
            }
            else {
                return null;
            }
        });
    },
    deleteCurrentBlogger(bloggerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentBlogger = yield db_1.bloggersCollection.findOne({ id: bloggerId });
            if (currentBlogger) {
                db_1.bloggersCollection.deleteOne({ id: bloggerId });
                return true;
            }
            else {
                return null;
            }
        });
    },
};
//# sourceMappingURL=bloggers-repository.js.map