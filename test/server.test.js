const request = require('supertest')
const app = require('../server')
const port = process.env.PORT || 3000
const postsData = require('../model/posts.json')
describe('API server', ()=>{
    let api;

    beforeAll(()=>{
        api = app.listen(port, ()=> {console.log(`Server is running on port ${port}`)}) 
    })

    afterAll(done => {
        console.log('Stopping the server.')
        api.close(done)
    })

    test('should return /posts with correct info and status code', done=>{
        request(api).get('/posts')
                    .expect(200)
                    .expect(postsData, done)
    })

    test('should return /posts/:id with correct info and status code', done=>{
        request(api).get('/posts')
                    .expect(200)
                    .expect(postsData.req.params.id, done)
    })

    test('should return /posts/:comments with correct info and status code', done=>{
        request(api).get('/posts/:comments')
                    .expect(200)
                    .expect(postsData.req.params.comments, done)
    })

})