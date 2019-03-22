const express = require('express')
const path = require('path')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


app.get('/help', (req, res) => {
    res.send('help page')
})

app.get('/about', (req, res) => {
    res.send('about page')
})

app.get('/weather', (req, res) => {
    res.send('weather page')
})

app.listen(3000, () => console.log('Server is up'))
