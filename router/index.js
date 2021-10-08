const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

// we set some constants with mongo configuration stuff
const mongoUrl = 'mongodb://root:password@localhost:27017'
const mongoSettings = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


function router(app) {
    app.get('/' , (request, response) => {
        MongoClient.connect(mongoUrl, mongoSettings, async (error, client) => {
            const db = client.db('todo-app')
            const tasksCollection = db.collection('tasks')
            const completedTasks = await tasksCollection.find({completed: "true"}).toArray()
            const uncompletedTasks = await tasksCollection.find({completed: "false"}).toArray()
            completedTasks.reverse()
            uncompletedTasks.reverse()
            response.render('home', {completedTasks, uncompletedTasks})
        })
    })

    app.post('/addNewTask', (request, response) => {
        MongoClient.connect(mongoUrl, mongoSettings, async (error, client) => {
            if(request.body.name === '') {
                response.redirect('/' + encodeURIComponent('Incorrect_Credential'))
            } else {
                let task = {
                    name: request.body.name,
                    description: request.body.description,
                    priority: request.body.priority,
                    completed: "false"
                }
                const db = client.db('todo-app')
                const tasksCollection = db.collection('tasks')
                const result = await tasksCollection.insertMany([task])
                console.log(request.body)
                response.redirect('/')
            }
        })
    })

// handles requests like DELETE '/tasks/2349287sdfsjk245skjks2'
    app.delete('/tasks/:id/', (request, response) => {
        let id = ObjectId(request.params.id) // turns the string into an Object ID

        MongoClient.connect(mongoUrl, mongoSettings, async (error, client) => {
            let tasksCollection = client.db('todo-app').collection('tasks')
            await tasksCollection.deleteOne({_id: id})

            response.sendStatus(200)
        })
    })

    app.put('/tasks/:id/uncomplete', (request, response) => {
        let id = ObjectId(request.params.id) // turns the string into an Object ID
        MongoClient.connect(mongoUrl, mongoSettings, async (error, client) => {
            let tasksCollection = client.db('todo-app').collection('tasks')
            await tasksCollection.updateOne({_id: id}, {$set: {completed: "false"}})

            response.sendStatus(200)
        })
    })

    app.put('/tasks/:id/complete', (request, response) => {
        let id = ObjectId(request.params.id) // turns the string into an Object ID
        MongoClient.connect(mongoUrl, mongoSettings, async (error, client) => {
            let tasksCollection = client.db('todo-app').collection('tasks')
            await tasksCollection.updateOne({_id: id}, {$set: {completed: "true"}})

            response.sendStatus(200)
        })
    })

    app.put('/tasks/:id/update', (request, response) => {
        let id = ObjectId(request.params.id) // turns the string into an Object ID
        MongoClient.connect(mongoUrl, mongoSettings, async (error, client) => {
           console.log(request.body.name)

            let tasksCollection = client.db('todo-app').collection('tasks')
            await tasksCollection.updateOne({_id: id}, {$set: {name: request.body.name, description: request.body.description, priority: request.body.priority, completed: request.body.completed}})

            response.sendStatus(200)
        })
    })
}

module.exports = router