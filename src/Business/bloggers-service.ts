import {bloggersCollection} from "../Repositories/Db/db";
import {bloggersRepository} from "../Repositories/Blogers/bloggers-repository";



export type CreateBloggersDataType = {
    name: string;
    youtubeUrl: string;
}

export const bloggersService = {
    async getBloggers  (){
        return bloggersRepository.getBloggers();
    },
    async setBlogger({name,youtubeUrl}:CreateBloggersDataType){

        const newBlogger = {
            id: +new Date(),
            name,
            youtubeUrl,
        }

        return bloggersRepository.setBlogger(newBlogger);

    },
    async getCurrentBlogger(bloggerId:number){
            return bloggersRepository.getCurrentBlogger(bloggerId)
    },
    async updateCurrentBlogger({name,youtubeUrl}:CreateBloggersDataType,bloggerId:number){

        const newBlogger = {
            id: bloggerId,
            name,
            youtubeUrl,
        }
       return bloggersRepository.updateCurrentBlogger(newBlogger,bloggerId)
    },
    async deleteCurrentBlogger(bloggerId:number){
        return bloggersRepository.deleteCurrentBlogger(bloggerId)

    },
};