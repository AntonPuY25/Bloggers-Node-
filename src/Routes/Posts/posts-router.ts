import {NextFunction, Request, Response, Router} from "express";
import {postsRepository} from "../../Repositories/Posts/posts-repository";
const { body, validationResult } = require('express-validator');

export const PostsRoute = Router();

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
    (req:Request, res:Response) => {
    const data = req.body;
        if(data){
            const currentData = postsRepository.createPost(data);
            if(currentData){
                res.status(201).send(postsRepository.createPost(data))
            }else{
                res.send(400)
            }

        }else{
            return res.status(400).send({
                "errorsMessages": [
                    {
                        "message": "string",
                        "field": "string"
                    }
                ]
            })
        }
    })

PostsRoute.put('/:postId',
    (req:Request, res:Response) => {
        const postId = +req.params.postId;
        const data = req.body;
        if(postId && data){
            const currentData = postsRepository.updatePost(postId,data);
            if(currentData){
                res.send(204)
            }else{
                res.send(404)
            }
        }else{
            return res.status(400).send({
                "errorsMessages": [
                    {
                        "message": "string",
                        "field": "string"
                    }
                ]
            })
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
