const request = require('supertest');
const app = require('../server');
const port = process.env.PORT || 5000;
const postsData = require('../model/posts.json');

describe('API server', ()=>{
    let api;

    beforeAll(()=>{
        api = app.listen(port, ()=> {console.log(`Server is running on port ${port}`)}) 
    })

    afterAll(done => {
        console.log('Stopping the server.')
        api.close(done)
    })

    test('should return /posts/:id/:comments with correct info and status code', ()=>{
        request(api).get('/posts/:id/:comments')
                    .expect(200)
                    .then(req => {
                        expect(req.body.comments);
                               done();

                    })
    })
})

