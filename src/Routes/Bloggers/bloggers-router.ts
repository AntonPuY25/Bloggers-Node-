import {NextFunction, Request, Response, Router} from "express";
import {bloggersService} from "../../Business/bloggers-service";
const { body, validationResult } = require('express-validator');

export const BloggersRoute = Router();

const urlValidator = body('youtubeUrl').trim().isURL().isLength({min:3,max:100});
const nameValidator = body('name').trim().isLength({min:3,max:15});


const errorMiddleWAre =  (req:Request, res:Response, next:NextFunction) => {
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
    async (req:Request, res:Response) => {
        res.status(200).send(await bloggersService.getBloggers())
    })

BloggersRoute.get('/:id',
    async (req:Request, res:Response) => {
    const id = +req.params.id;
    if(id){
        const currentBlogger = await bloggersService.getCurrentBlogger(id);
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
    nameValidator,urlValidator,errorMiddleWAre, async (req:Request, res:Response) => {
        res.status(201).send(await bloggersService.setBlogger(req.body))
    })


BloggersRoute.put('/:id',
    nameValidator,urlValidator,errorMiddleWAre, async(req:Request, res:Response) => {
        const id = +req.params.id;
        if(id){
            const currentBlogger = await bloggersService.updateCurrentBlogger(req.body,id);
            if(currentBlogger){
                res.send(204);
            }else{
                res.send(404)
            }
        }else{
            res.status(404)
        }

    })

BloggersRoute.delete('/:id',
    async (req:Request, res:Response) => {
        const id = +req.params.id;
        if(id){
            const deletedBlogger = await bloggersService.deleteCurrentBlogger(id);
            if(deletedBlogger){
                res.send(204)
            }else{
                res.send(404)
            }
        }else{
            res.send(404)
        }

    })