require('dotenv').config()
const mongoose = require('mongoose')
const Person = require('./models/person')


const express = require('express')
const cors = require('cors')
const app = express()
var morgan = require('morgan')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        response.status(400).send( {error: 'malformatted id'} )
    }
    next(error)
}
morgan.token('content', (request, response) => {
    return request.method === 'POST' ? JSON.stringify(request.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const date = new Date()
    Person.find({}).then(persons => {
        const length = persons.length
        response.send('Phonebook has info for ' + length + ' people <br /> <br />' + date)
    })
    

})

app.put('/api/persons/:id', (request, response) => {
    const { name, number } = request.body

    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }

            person.name = name
            person.number = number

            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findById(id).then(person => {
        response.json(person)
    }).catch(error => {
        response.status(404).end()
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(result => {
        response.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    console.log('here')
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: "name missing"
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: "number missing"
        })
    }

    Person.find({}).then(persons => {
        const duplicatePerson = persons.find(person => person.name === body.name)
        if (duplicatePerson) {
            return response.status(400).json({
                error: "name must be unique"
            })
        }
    })

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

})

const unknownEndPoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndPoint)
app.use(errorHandler)

const PORT = 3001 || process.env.port
app.listen(PORT)
console.log(`Server running on port ${PORT}`)