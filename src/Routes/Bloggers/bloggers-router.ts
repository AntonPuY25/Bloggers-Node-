import {NextFunction, Request, Response, Router} from "express";
import {bloggersRepository} from "../../Repositories/Blogers/bloggers-repository";
const { body, validationResult } = require('express-validator');

export const BloggersRoute = Router();

const urlValidator = body('youtubeUrl').trim().isURL().isLength({min:3,max:100});
const nameValidator = body('name').trim().isLength({min:3,max:15});


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
    nameValidator,urlValidator,errorMiddleWAre,(req:Request, res:Response) => {
        res.status(201).send(bloggersRepository.setBlogger(req.body))
    })


BloggersRoute.put('/:id',
    nameValidator,urlValidator,errorMiddleWAre,(req:Request, res:Response) => {
        const id = +req.params.id;
        if(id){
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