const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use(morgan(function (tokens, req, res) {
    const message = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
      ]
      
    if (tokens.method(req, res) === "POST") {
        return message.concat(JSON.stringify(req.body)).join(' ')
    }
    else {
        return message.join(' ')
    }
    
  }))

app.use(express.static('build'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    })

app.get('/info', (request, response) => {

    response.send(`<p>Phonebook has info for ${persons.length} people.</p>
                   <p>${Date().toString()}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  })

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'content missing' 
        })
    }
    else if (persons.filter(person => person.name === body.name).length > 0) {
        return response.status(400).json({ 
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: persons.map(person => person.id)[persons.length - 1] + 1
    }

    persons = persons.concat(person)
    
    response.json(persons)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})