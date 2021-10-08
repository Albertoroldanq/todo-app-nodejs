// - using express, handlebars, mongodb
// - create a Todo app
// - all the tasks should be on one page
// - for each task it should be clear to see whether it is completed or not
// - it should be possible to complete a task from the homepage
// - there should be a form for creating a new task
// - stretch goals
// - mark a completed task as uncompleted
// - deleting a task
// - editing a task
// - css

const express = require('express')
const router = require('./router/')
const expressHandlebars = require('express-handlebars')
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId // pay attention to spelling


const app = express()
const port = 3000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static('public'))
app.engine('handlebars', expressHandlebars())
app.set('view engine', 'handlebars')

router(app)

app.listen(port)