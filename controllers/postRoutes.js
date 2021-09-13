const express= require('express')
const route = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid')
const dayjs = require('dayjs')


route.get('/', (req, res)=>{
    res.send("Hello world")
})

route.post('/posts', (req, res)=>{
    
    const post ={
        id:uuidv4(),
        text:req.body.text,
        comments:[],
        likes:0,
        date:dayjs(Date.now()).format('DD-MM-YY HH:mm A')
    }
    const postsData = fs.readFileSync('./model/posts.json', "utf-8");
   res.send(post)
    
})





module.exports = route