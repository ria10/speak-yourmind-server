const request = require("supertest");
const app = require("../server");
const port = process.env.PORT || 5000;
const postsData = require("../model/posts.json");

describe("API server", () => {
    let api;
  
    beforeAll(() => {
      api = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    });
  
    afterAll((done) => {
      console.log("Stopping the server.");
      api.close(done);
    });

    test("should return /post/:id/comment with correct info and status code", (done) => {
        request(api)
          .get("/post/:id/comment")
          .expect(200)
          .then((req) => {
            expect(req.body.comments);
            done();
          });
      });

    test("should return /post/7f4f4da3-00a7-409a-90e5-9654d1852c44/likes with correct info and status code", (done) => {
        request(api)
          .post("/post/7f4f4da3-00a7-409a-90e5-9654d1852c44/likes")
          .send({"text": "liked"})
          .expect(200)
          .then(() => {
            expect([{text: "liked"}]);
            done();
          });
      });

      test("should return /post/7f4f4da3-00a7-409a-90e5-9654d1852c44/crying with correct info and status code", (done) => {
        request(api)
          .post("/post/7f4f4da3-00a7-409a-90e5-9654d1852c44/crying")
          .send({"text": "liked"})
          .expect(200)
          .then(() => {
            expect([{text: "liked"}]);
            done();
          });
      });

      test("should return /post/7f4f4da3-00a7-409a-90e5-9654d1852c44/laugh with correct info and status code", (done) => {
        request(api)
          .post("/post/7f4f4da3-00a7-409a-90e5-9654d1852c44/laugh")
          .send({"text": "liked"})
          .expect(200)
          .then(() => {
            expect([{text: "liked"}]);
            done();
          });
      });

      test("should return /post/7f4f4da3-00a7-409a-90e5-9654d1852c44/comment with correct info and status code", (done) => {
        request(api)
          .post("/post/7f4f4da3-00a7-409a-90e5-9654d1852c44/comment")
          .send({"text": "liked"})
          .expect(200)
          .then(() => {
            expect([{text: "liked"}]);
            done();
          });
      });
      
    test("should return /posts with correct info and status code", (done) => {
        request(api)
          .get("/posts")
          .expect(200)
          .then(() => {
            expect(postsData.posts);
            done();
          });
      });

    test("404 for unknown paths", (done) => {
        request(api).get("/hello").expect(404, done);
      });

    test("should add test post to the postsData", (done) => {
        let testPost = { text: "Hello, this is a test post" };
        request(api)
          .post("/posts")
          .send(testPost)
          .expect(201)
          .then((req) => {
            expect(req.body.text).toEqual("Hello, this is a test post");
            done();
          })
          
      });

    test("should return /posts/:id with correct info and status code", (done) => {
        request(api)
          .get("/post/7f4f4da3-00a7-409a-90e5-9654d1852c44")
          .then((req) => {
            expect(200);
            expect(req.body.text).toEqual("first post");
            done();
          });
          
      });
})
