const express = require('express')
const bodyParser = require('body-parser')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', (req, res) => {
    
    const users = User.find({}).then(users => res.send(users))
                      .catch(error => res.status(500).send(error))
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then(user => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch(error => {
        res.status(500).send()
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then(tasks => {
        res.send(tasks)
    }).catch(error => {
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then(task => {
        res.send(task)
    }).catch(error => {
        res.status(500).send()
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
