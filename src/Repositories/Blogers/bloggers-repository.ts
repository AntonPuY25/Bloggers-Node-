export const bloggers = [
    {
        id: 1,
        name: "Dymich",
        youtubeUrl: "https://www.youtube.com/c/ITKAMASUTRA"
    },
    ];

export type CreateBloggersDataType = {
    name: string;
    youtubeUrl: string;
}
export const bloggersRepository = {
    getBloggers(){
        return bloggers
    },
    setBlogger({name,youtubeUrl}:CreateBloggersDataType){

        const newBlogger = {
            id: +new Date(),
            name,
            youtubeUrl,
        }
        bloggers.push(newBlogger)

        return newBlogger;

    },
    getCurrentBlogger(bloggerId:number){
        const currentBlogger = bloggers.find(({id})=>id === bloggerId)
        if(currentBlogger){
            return currentBlogger
        }else{
            return null
        }
    },
    updateCurrentBlogger({name,youtubeUrl}:CreateBloggersDataType,bloggerId:number){

        const newBlogger = {
            id: bloggerId,
            name,
            youtubeUrl,
        }
        const currentBloggerId = bloggers.findIndex(({id})=>id === bloggerId)
        if(currentBloggerId !== -1){
            return bloggers.splice(currentBloggerId,1,newBlogger)
        }else{
            return null
        }
    },
    deleteCurrentBlogger(bloggerId:number){
        const currentBloggerId = bloggers.findIndex(({id})=>id === bloggerId)
        if(currentBloggerId !== -1) {
            return bloggers.splice(currentBloggerId, 1)
        }else{
            return  null
        }


    },
};