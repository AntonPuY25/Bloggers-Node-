"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRoute = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../../Repositories/Posts/posts-repository");
const { body, validationResult } = require('express-validator');
exports.PostsRoute = (0, express_1.Router)();
exports.PostsRoute.get('/', (req, res) => {
    res.status(200).send(posts_repository_1.postsRepository.getPosts());
});
exports.PostsRoute.get('/:postId', (req, res) => {
    const postId = +req.params.postId;
    if (postId) {
        const currenPost = posts_repository_1.postsRepository.getCurrentPost(postId);
        if (currenPost) {
            res.status(200).send(currenPost);
        }
        else {
            res.send(404);
        }
    }
    else {
        res.send(400);
    }
});
exports.PostsRoute.post('/', (req, res) => {
    const data = req.body;
    if (data) {
        const currentData = posts_repository_1.postsRepository.createPost(data);
        if (currentData) {
            res.status(200).send(posts_repository_1.postsRepository.createPost(data));
        }
        else {
            res.send(400);
        }
    }
    else {
        return res.status(400).send({
            "errorsMessages": [
                {
                    "message": "string",
                    "field": "string"
                }
            ]
        });
    }
});
exports.PostsRoute.put('/:postId', (req, res) => {
    const postId = +req.params.postId;
    const data = req.body;
    if (postId && data) {
        const currentData = posts_repository_1.postsRepository.updatePost(postId, data);
        if (currentData) {
            res.send(204);
        }
        else {
            res.send(404);
        }
    }
    else {
        return res.status(400).send({
            "errorsMessages": [
                {
                    "message": "string",
                    "field": "string"
                }
            ]
        });
    }
});
exports.PostsRoute.delete('/:postId', (req, res) => {
    const postId = +req.params.postId;
    if (postId) {
        const currenPost = posts_repository_1.postsRepository.deletedPost(postId);
        if (currenPost) {
            res.send(204);
        }
        else {
            res.send(404);
        }
    }
    else {
        res.send(400);
    }
});
//# sourceMappingURL=posts-router.js.map