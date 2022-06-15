"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloggersRoute = void 0;
const express_1 = require("express");
const bloggers_repository_1 = require("../../Repositories/Blogers/bloggers-repository");
const { body, validationResult } = require('express-validator');
exports.BloggersRoute = (0, express_1.Router)();
const urlValidator = body('youtubeUrl').isURL().isLength({ min: 3, max: 100 });
const nameValidator = body('name').isLength({ min: 3, max: 15 });
const errorMiddleWAre = (req, res, next) => {
    const errors = validationResult(req).errors;
    const isEmpty = validationResult(req).isEmpty();
    if (!isEmpty) {
        const errorsWithoutDuplicate = errors.filter((item, index) => {
            const duplicate = errors.find((el, i) => (i < index && el.param === item.param));
            return !duplicate;
        });
        const test = errorsWithoutDuplicate.map((item) => {
            return { message: `${item.param} incorrect`, field: item.param };
        });
        return res.status(400).send({ errorsMessages: test });
    }
    next();
};
exports.BloggersRoute.get('/', (req, res) => {
    res.status(200).send(bloggers_repository_1.bloggersRepository.getBloggers());
});
exports.BloggersRoute.get('/:id', (req, res) => {
    const id = +req.params.id;
    if (id) {
        const currentBlogger = bloggers_repository_1.bloggersRepository.getCurrentBlogger(id);
        if (currentBlogger) {
            res.status(200).send(currentBlogger);
        }
        else {
            res.send(404);
        }
    }
    else {
        res.send(404);
    }
});
exports.BloggersRoute.post('/', nameValidator, urlValidator, errorMiddleWAre, (req, res) => {
    if (!req.body.name || !req.body.youtubeUrl) {
        res.send({
            "errorsMessages": [
                {
                    "message": "Not valid params",
                    "field": "youtubeUrl"
                }
            ]
        });
    }
    else {
        res.status(201).send(bloggers_repository_1.bloggersRepository.setBlogger(req.body));
    }
});
exports.BloggersRoute.put('/:id', urlValidator, errorMiddleWAre, (req, res) => {
    const id = +req.params.id;
    const { name, youtubeUrl } = req.body;
    if (id && name && youtubeUrl) {
        const currentBlogger = bloggers_repository_1.bloggersRepository.updateCurrentBlogger(req.body, id);
        if (currentBlogger === null || currentBlogger === void 0 ? void 0 : currentBlogger.length) {
            res.send(204);
        }
        else {
            res.send(404);
        }
    }
    else {
        res.status(404).send({
            "errorsMessages": [
                {
                    "message": "Not valid params",
                    "field": "youtubeUrl"
                }
            ]
        });
    }
});
exports.BloggersRoute.delete('/:id', (req, res) => {
    const id = +req.params.id;
    if (id) {
        const deletedBlogger = bloggers_repository_1.bloggersRepository.deleteCurrentBlogger(id);
        if (deletedBlogger) {
            res.send(204);
        }
        else {
            res.send(404);
        }
    }
    else {
        res.send(404);
    }
});
//# sourceMappingURL=bloggers-router.js.map