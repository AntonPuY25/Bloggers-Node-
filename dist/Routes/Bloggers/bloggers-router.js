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
exports.BloggersRoute = void 0;
const express_1 = require("express");
const bloggers_service_1 = require("../../Business/bloggers-service");
const { body, validationResult } = require('express-validator');
exports.BloggersRoute = (0, express_1.Router)();
const urlValidator = body('youtubeUrl').trim().isURL().isLength({ min: 3, max: 100 });
const nameValidator = body('name').trim().isLength({ min: 3, max: 15 });
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
exports.BloggersRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send(yield bloggers_service_1.bloggersService.getBloggers());
}));
exports.BloggersRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    if (id) {
        const currentBlogger = yield bloggers_service_1.bloggersService.getCurrentBlogger(id);
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
}));
exports.BloggersRoute.post('/', nameValidator, urlValidator, errorMiddleWAre, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(201).send(yield bloggers_service_1.bloggersService.setBlogger(req.body));
}));
exports.BloggersRoute.put('/:id', nameValidator, urlValidator, errorMiddleWAre, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    if (id) {
        const currentBlogger = yield bloggers_service_1.bloggersService.updateCurrentBlogger(req.body, id);
        if (currentBlogger) {
            res.send(204);
        }
        else {
            res.send(404);
        }
    }
    else {
        res.status(404);
    }
}));
exports.BloggersRoute.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    if (id) {
        const deletedBlogger = yield bloggers_service_1.bloggersService.deleteCurrentBlogger(id);
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
}));
//# sourceMappingURL=bloggers-router.js.map