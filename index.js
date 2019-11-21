require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

morgan.token('postString', function getString (req) {
	return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postString'))

// let persons = [
//     {
//         name: "Arto Hellas",
//         number: "040-123456",
//         id: 1,
//     },
//     {
//         name: "Ada Lovelace",
//         number: "39-44-5323523",
//         id: 4,
//     },
//     {
//         name: "Dan Abramov",
//         number: "12-43-234345",
//         id: 3,
//     },
//     {
//         name: "Mary Poppendieck",
//         number: "39-23-6423122",
//         id: 4,
//     },
// ]

app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons.map(person => person.toJSON()))
	})
})

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(person.toJSON())
			}
			else {
				res.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body

	const person = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(req.params.id, person, {new: true})
		.then(updatedPerson => {
			res.json(updatedPerson.toJSON())
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

app.get('/info', (req, res, next) => {
	const now = new Date()

	Person.find({})
		.then(persons => {
			if (persons) {
				const amount = persons.length
				res.send(`Phonebook has info for ${amount} people <p /> ${now}`)
			} else {
				res.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
	const body = req.body

	if (body.name === undefined || body.number === undefined) {
		return res.status(400).json({ error: 'data missing' })
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person.save()
		.then(savedPerson => savedPerson.toJSON())
		.then(savedAndFormattedPerson => res.json(savedAndFormattedPerson))
		.catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
	console.error(error.message)

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return res.status(400).send( {error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return (res.status(400).json({ error: error.message}))
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})