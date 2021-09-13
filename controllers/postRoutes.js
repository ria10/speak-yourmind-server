const express= require('express')
const route = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid')
const dayjs = require('dayjs');
const Joi = require('joi');


route.get('/', (req, res)=>{
    res.send("Hello world")
})

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

      const post ={
        id:uuidv4(),
        text:req.body.text,
        comments:[],
        likes:0,
        date:dayjs(Date.now()).format('DD-MM-YY HH:mm A')
    }

    savePost(res, postsObjects,post)
    
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