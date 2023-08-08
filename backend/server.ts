const express = require('express');
require('dotenv').config();
var cors = require('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/auth', require('./routes/auth')); // authentication routes
app.use('/posts', require('./routes/posts')); // posts routes
app.use('/user', require('./routes/user')); // user routes

app.listen(port, () => console.log(`Server running on localhost:${port}!`))
