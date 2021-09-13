const express = require('express')
const app = express();
const postRoute = require("./controllers/postRoutes")
const cors = require('cors')



app.use(express.json())
app.use(cors())

app.use('/', postRoute)




module.exports = app;