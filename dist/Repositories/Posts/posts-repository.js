"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = exports.posts = void 0;
const bloggers_repository_1 = require("../Blogers/bloggers-repository");
exports.posts = [
    {
        id: 1,
        title: "New Post",
        shortDescription: "Short Description",
        content: "AAAAAAAAAAAAAAAAAAAA",
        bloggerId: 1,
        bloggerName: "Dimych"
    }
];
exports.postsRepository = {
    getPosts() {
        return exports.posts;
    },
    getCurrentPost(postId) {
        const currentPost = exports.posts.find(({ id }) => id === postId);
        if (currentPost) {
            return currentPost;
        }
        else {
            return null;
        }
    },
    createPost({ shortDescription, content, title, bloggerId }) {
        const currentBlogger = bloggers_repository_1.bloggers.find(({ id }) => id === bloggerId);
        if (currentBlogger) {
            const newPost = {
                id: +new Date(),
                title,
                shortDescription,
                content,
                bloggerId,
                bloggerName: currentBlogger.name
            };
            exports.posts.push(newPost);
            return newPost;
        }
        else {
            return null;
        }
    },
    updatePost(postId, { shortDescription, content, title, bloggerId }) {
        const currentPostIndex = exports.posts.findIndex(({ id }) => id === postId);
        const currentBlogger = bloggers_repository_1.bloggers.find(({ id }) => id === bloggerId);
        if (currentPostIndex !== -1 && currentBlogger) {
            const newPost = {
                id: postId,
                title,
                shortDescription,
                content,
                bloggerId,
                bloggerName: exports.posts[currentPostIndex].bloggerName
            };
            return exports.posts.splice(currentPostIndex, 1, newPost);
        }
        else {
            return null;
        }
    },
    deletedPost(postId) {
        const currentPostIndex = exports.posts.findIndex(({ id }) => id === postId);
        if (currentPostIndex !== -1) {
            return exports.posts.splice(currentPostIndex, 1);
        }
        else {
            return null;
        }
    }
};
//# sourceMappingURL=posts-repository.js.map