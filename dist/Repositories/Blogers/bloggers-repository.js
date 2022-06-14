"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloggersRepository = exports.bloggers = void 0;
exports.bloggers = [
    {
        id: 1,
        name: "Dymich",
        youtubeUrl: "https://www.youtube.com/c/ITKAMASUTRA"
    },
];
exports.bloggersRepository = {
    getBloggers() {
        return exports.bloggers;
    },
    setBlogger({ name, youtubeUrl }) {
        const newBlogger = {
            id: +new Date(),
            name,
            youtubeUrl,
        };
        exports.bloggers.push(newBlogger);
        return newBlogger;
    },
    getCurrentBlogger(bloggerId) {
        const currentBlogger = exports.bloggers.find(({ id }) => id === bloggerId);
        if (currentBlogger) {
            return currentBlogger;
        }
        else {
            return null;
        }
    },
    updateCurrentBlogger({ name, youtubeUrl }, bloggerId) {
        const newBlogger = {
            id: +new Date(),
            name,
            youtubeUrl,
        };
        const currentBloggerId = exports.bloggers.findIndex(({ id }) => id === bloggerId);
        if (currentBloggerId !== -1) {
            return exports.bloggers.splice(currentBloggerId, 1, newBlogger);
        }
        else {
            return null;
        }
    },
    deleteCurrentBlogger(bloggerId) {
        const currentBloggerId = exports.bloggers.findIndex(({ id }) => id === bloggerId);
        if (currentBloggerId !== -1) {
            return exports.bloggers.splice(currentBloggerId, 1);
        }
        else {
            return null;
        }
    },
};
//# sourceMappingURL=bloggers-repository.js.map