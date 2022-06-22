import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import {BloggersRoute} from "./Routes/Bloggers/bloggers-router";
import {PostsRoute} from "./Routes/Posts/posts-router";
import {runDb} from "./Repositories/Db/db";

const app = express()

const port = process.env.PORT || 3000
app.use(cors())
app.use(bodyParser())

const testMiddleWare = (req:Request, res:Response, next:NextFunction) => {
    console.log('Hello')
    next()
};

app.use(testMiddleWare)


const parserMiddleWare = bodyParser({})
app.use(parserMiddleWare)


app.get('/', (req:Request, res:Response) => {
    res.send('Hello World1')
})

app.use('/bloggers',BloggersRoute )
app.use('/posts',PostsRoute )


const startApp = async ()=>{
    await runDb();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()

