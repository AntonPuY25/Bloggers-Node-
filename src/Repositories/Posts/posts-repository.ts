import {bloggers} from "../Blogers/bloggers-repository";

export const posts = [
    {
        id: 1,
        title: "New Post",
        shortDescription: "Short Description",
        content: "AAAAAAAAAAAAAAAAAAAA",
        bloggerId: 1,
        bloggerName: "Dimych"
    }
];

type CreatePostDateType = {
    "title": string,
    "shortDescription": string,
    "content": string,
    "bloggerId": number,

}

export const postsRepository = {
    getPosts(){
        return posts
    },
    getCurrentPost(postId: number){
        const currentPost = posts.find(({id})=>id===postId)
        if(currentPost){
            return currentPost
        }else{
            return null
        }
    },
    createPost({shortDescription,content,title,bloggerId}:CreatePostDateType){
        const currentBlogger = bloggers.find(({id})=>id === bloggerId)
        if(currentBlogger){
            const newPost = {
                id: +new Date(),
                title,
                shortDescription,
                content,
                bloggerId,
                bloggerName: currentBlogger.name
            }
            posts.push(newPost)
            return newPost
        }else{
            return null
        }

    },
    updatePost(postId: number,{shortDescription,content,title,bloggerId}:CreatePostDateType){
        const currentPostIndex = posts.findIndex(({id})=>id===postId)
        const currentBlogger = bloggers.find(({id})=>id === bloggerId)
        if(currentPostIndex !== -1 && currentBlogger){
            const newPost = {
                id: postId,
                title,
                shortDescription,
                content,
                bloggerId,
                bloggerName: posts[currentPostIndex].bloggerName
            }
            return  posts.splice(currentPostIndex,1,newPost)

        }else{

            return null
        }
    },
    deletedPost(postId: number){
        const currentPostIndex = posts.findIndex(({id})=>id===postId)
        if(currentPostIndex !== -1){
            return  posts.splice(currentPostIndex,1)
        }else{
            return null
        }
    }

};