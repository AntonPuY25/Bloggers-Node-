import {NextFunction, Request, Response, Router} from "express";
import {bloggersRepository} from "../../Repositories/Blogers/bloggers-repository";
const { body, validationResult } = require('express-validator');

export const BloggersRoute = Router();

BloggersRoute.get('/',
    (req:Request, res:Response) => {
        res.status(200).send(bloggersRepository.getBloggers())
    })

BloggersRoute.get('/:id',
    (req:Request, res:Response) => {
    const id = +req.params.id;
    if(id){
        const currentBlogger = bloggersRepository.getCurrentBlogger(id);
        if(currentBlogger){
            res.status(200).send(currentBlogger)
        }else{
            res.send(404)
        }
    }else{
        res.send(404)
    }

    })

BloggersRoute.post('/',
    (req:Request, res:Response) => {
    if(!req.body.name || !req.body.youtubeUrl){
        res.send({
            "errorsMessages": [
                {
                    "message": "Not valid params",
                    "field": "youtubeUrl"
                }
            ]
        })
    }else{
        res.status(200).send(bloggersRepository.setBlogger(req.body))
    }
    })

BloggersRoute.put('/:id',
    (req:Request, res:Response) => {
        const id = +req.params.id;
        const {name,youtubeUrl} = req.body;
        if(id && name && youtubeUrl){
            const currentBlogger = bloggersRepository.updateCurrentBlogger(req.body,id);
            if(currentBlogger?.length){
                res.send(204);
            }else{
                res.send(404)
            }
        }else{
            res.status(404).send({
                "errorsMessages": [
                    {
                        "message": "Not valid params",
                        "field": "youtubeUrl"
                    }
                ]
            })
        }

    })

BloggersRoute.delete('/:id',
    (req:Request, res:Response) => {
        const id = +req.params.id;
        if(id){
            const deletedBlogger = bloggersRepository.deleteCurrentBlogger(id);
            if(deletedBlogger){
                res.send(204)
            }else{
                res.send(404)
            }
        }else{
            res.send(404)
        }

    })