import {bloggersCollection} from "../Db/db";


export const bloggers = [
    {
        id: 1,
        name: "Dymich",
        youtubeUrl: "https://www.youtube.com/c/ITKAMASUTRA"
    },
    ];

export type CreateBloggersDataType = {
    id: number,
    name: string;
    youtubeUrl: string;
}

export const bloggersRepository = {
    async getBloggers  (){
        return bloggersCollection.find({}).toArray();
    },
    async setBlogger(newBlogger:CreateBloggersDataType){

        bloggersCollection.insertOne(newBlogger)

        return newBlogger;

    },
    async getCurrentBlogger(bloggerId:number){
        const currentBlogger = bloggersCollection.findOne({id:bloggerId})
        if(currentBlogger){
            return currentBlogger
        }else{
            return null
        }
    },
    async updateCurrentBlogger(newBlogger:CreateBloggersDataType,bloggerId:number){

        const currentBlogger = await bloggersCollection.findOne({id:bloggerId})
        if(currentBlogger){
            bloggersCollection.updateOne({id:bloggerId},{$set: {name:newBlogger.name,youtubeUrl:newBlogger.youtubeUrl}})
            return newBlogger
        }else{
            return null
        }
    },
    async deleteCurrentBlogger(bloggerId:number){
        const currentBlogger = await bloggersCollection.findOne({id:bloggerId})
        if(currentBlogger) {
            bloggersCollection.deleteOne({id:bloggerId})
            return true
        }else{
            return null
        }


    },
};