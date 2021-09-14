const request = require('supertest');
const app = require('../server');
const port = process.env.PORT || 4000;
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

    test('should return /posts with correct info and status code', done=>{
        request(api).get('/posts')
                    .expect(200)
                    .expect(postsData, done)

    })

    test('404 for unknown paths', done => {
        request(api)
            .get('/hello')
            .expect(404, done);
    })

    test('should add test post to the postsData', done => {
        let testPost = {text: "Hello, this is a test post"}
        request(api)
        .post('/posts')
        .send(testPost) 
        .expect(201)
        .then((req) => {
            expect(req.body.text).toEqual("Hello, this is a test post");
            done();
        });
            
        })

})