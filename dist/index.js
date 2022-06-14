"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const bloggers_router_1 = require("./Routes/Bloggers/bloggers-router");
const posts_router_1 = require("./Routes/Posts/posts-router");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use((0, body_parser_1.default)());
const testMiddleWare = (req, res, next) => {
    console.log('Hello');
    next();
};
app.use(testMiddleWare);
const parserMiddleWare = (0, body_parser_1.default)({});
app.use(parserMiddleWare);
app.get('/', (req, res) => {
    res.send('Hello World1');
});
app.use('/bloggers', bloggers_router_1.BloggersRoute);
app.use('/posts', posts_router_1.PostsRoute);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map