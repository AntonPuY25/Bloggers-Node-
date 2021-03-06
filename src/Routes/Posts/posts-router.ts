import {NextFunction, Request, Response, Router} from "express";
import {posts, postsRepository} from "../../Repositories/Posts/posts-repository";
const { body, validationResult } = require('express-validator');

export const PostsRoute = Router();
const titleValidator = body('title').trim().isLength({min:3,max:30});
const shortDescriptionValidator = body('shortDescription').trim().isLength({min:3,max:100});
const contentValidator = body('content').trim().isLength({min:3,max:1000});

const errorMiddleWAre = (req:Request, res:Response, next:NextFunction) => {
    const errors: any[] = validationResult(req).errors;
    const isEmpty = validationResult(req).isEmpty();

    if (!isEmpty) {
        const errorsWithoutDuplicate = errors.filter((item:any,index:number)=>{
            const duplicate = errors.find((el, i) => (i < index && el.param === item.param));
            return !duplicate;
        })
        const test = errorsWithoutDuplicate.map((item:any)=>{
            return   { message: `${item.param} incorrect`, field: item.param }
        });
        return res.status(400).send({ errorsMessages: test});
    }
    next()
};
PostsRoute.get('/',
    (req:Request, res:Response) => {
        res.status(200).send(postsRepository.getPosts())
    })

PostsRoute.get('/:postId',
    (req:Request, res:Response) => {
    const postId = +req.params.postId;
    if(postId){
        const currenPost = postsRepository.getCurrentPost(postId)
        if(currenPost){
            res.status(200).send(currenPost)
        }else{
            res.send(404)
        }

    }else{
        res.send(400)
    }

    })

PostsRoute.post('/',
    titleValidator,shortDescriptionValidator,contentValidator,errorMiddleWAre,(req:Request, res:Response) => {
        const data = req.body;
        const currentData = postsRepository.createPost(data);
        if (currentData) {
            res.status(201).send(currentData)
        } else {
            res.status(400).send( { errorsMessages: [{ message: 'Not found', field: "bloggerId" }] })
        }
    })

PostsRoute.put('/:postId',
    titleValidator,shortDescriptionValidator,contentValidator,errorMiddleWAre,(req:Request, res:Response) => {
        const postId = +req.params.postId;
        const data = req.body;

        const currenPost = posts.find(({id})=> id ===postId)
        if(!currenPost){
            res.send(404)
        }

        const currentData = postsRepository.updatePost(postId, data);
        if (currentData) {
            res.send(204)
        } else {
            res.status(400).send( { errorsMessages: [{ message: 'Not found', field: "bloggerId" }] })
        }
    })

PostsRoute.delete('/:postId',
    (req:Request, res:Response) => {
        const postId = +req.params.postId;
        if(postId){
            const currenPost = postsRepository.deletedPost(postId)
            if(currenPost){
                res.send(204)
            }else{
                res.send(404)
            }

        }else{
            res.send(400)
        }

    })
