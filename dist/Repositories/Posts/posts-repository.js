"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const bloggers_repository_1 = require("../Blogers/bloggers-repository");
const posts = [
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
        return posts;
    },
    getCurrentPost(postId) {
        const currentPost = posts.find(({ id }) => id === postId);
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
            posts.push(newPost);
            return newPost;
        }
        else {
            return null;
        }
    },
    updatePost(postId, { shortDescription, content, title, bloggerId }) {
        const currentPostIndex = posts.findIndex(({ id }) => id === postId);
        if (currentPostIndex !== -1) {
            const newPost = {
                id: postId,
                title,
                shortDescription,
                content,
                bloggerId,
                bloggerName: posts[currentPostIndex].bloggerName
            };
            return posts.splice(currentPostIndex, 1, newPost);
        }
        else {
            return null;
        }
    },
    deletedPost(postId) {
        const currentPostIndex = posts.findIndex(({ id }) => id === postId);
        if (currentPostIndex !== -1) {
            return posts.splice(currentPostIndex, 1);
        }
        else {
            return null;
        }
    }
};
//# sourceMappingURL=posts-repository.js.map