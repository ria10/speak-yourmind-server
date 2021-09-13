const express= require('express')
const route = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid')
const dayjs = require('dayjs');
const Joi = require('joi');


route.get('/', (req, res)=>{
    res.send("Hello world")
})

//get all posts
route.get('/posts', (req, res)=>{
    const postsData =  fs.readFileSync('./model/posts.json', 'utf-8')
    if(postsData.length === 0) return res.send(401).send({"error":"no posts found"})

    res.status(200).send(JSON.parse(postsData))
})

//create a post
route.post('/posts', (req, res)=>{

    const schema = Joi.object({
        text:Joi.string().min(2).max(200).required()
    })
       
     const result = schema.validate(req.body)
     if(result.error){
         return res.status(400).send(result.error.details[0].message)
     }

     const postsObjects = {
         posts:[]
     }

      const post = {
        id:uuidv4(),
        text:req.body.text,
        comments:[],
        likes:0,
        date:dayjs(Date.now()).format('DD-MM-YY HH:mm A')
    }

    savePost(res, postsObjects,post)
     
    
    
    
})

//get a single post by id
route.get('/posts/:id', (req, res)=>{
    const postsData =  fs.readFileSync('./model/posts.json', 'utf-8')
    if(postsData.length === 0) return res.send(401).send({"error":"no posts found"})

    const parsedPostsData = JSON.parse(postsData);
    console.log(parsedPostsData)

    const requiredPost = parsedPostsData.posts.filter((post)=> post.id === req.params.id)
    console.log('required Post ' + requiredPost)
    if(requiredPost.length === 0) return  res.send(400).send({"error":"no post found"})
     res.status(200).send(requiredPost[0]);  
    
})

function savePost(res, postsObject, post){
    const postsData = fs.readFileSync('./model/posts.json', "utf-8");
    if(postsData.length === 0){
        fs.appendFile(".model/posts.json", JSON.stringify(postsObject),(err)=>{
            if(err) return res.status(500).send({"error":"Server error post not saved"})  
            res.status(200).send(postsObject)
        })
    }else{
        const parsedPostsData = JSON.parse(postsData)
        parsedPostsData.posts.push(post)
        fs.writeFile("./model/posts.json", JSON.stringify(parsedPostsData), (err)=>{
            if(err) return res.status(500).send({"error":"Server error post not saved"}) 
            res.status(200).send(parsedPostsData)
        } )
    }

  
}





module.exports = route