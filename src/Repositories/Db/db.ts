import { MongoClient } from "mongodb";


const mongoUri = process.env.mongoUri = 'mongodb://0.0.0.0:27017';

const client = new MongoClient(mongoUri);

const bdBloggers = client.db('bloggers')

export const bloggersCollection = bdBloggers.collection('bloggersCollection')

export async function runDb(){
    try{
        await client.connect();

        await client.db('learning').command({ping: 1});
        console.log('Connected successfully to mongo server')

    } catch{
        await client.close()
    }
}