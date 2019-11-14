const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())

morgan.token('postString', function getString (req) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postString'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1,
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 4,
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3,
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4,
    },
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) res.json(person)
    else res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(n => n.id !== id)

    console.log(persons.length)
    res.status(204).end()
})

app.get('/info', (req, res) => {
    const peopleAmount = persons.length
    const now = new Date()

    res.send(`Phonebook has info for ${peopleAmount} people <p /> ${now}`)
})

const generateId = () => {
    return Math.floor(Math.random() * 10000)
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name){
        return res.status(400).json({
            error: 'name is missing'
        })
    } else if (!body.number){
        return res.status(400).json({
            error: 'number is missing'
        })
    } else if (persons.find(n => n.name === body.name)){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    res.json(person)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)