import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

const port = 3001
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

let news = []

app.get('/news', (req, res) => {
    res.json(noticias)
})

app.post('/news', (req, res) => {
    const aNew = req.body
    news.push(aNew)
    res.sendStatus(201)
})
