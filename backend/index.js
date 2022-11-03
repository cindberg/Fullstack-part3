const { response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const http = require('http')


app.use(express.static('build'))
app.use(express.json())
app.use(cors())



morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :body'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Dark Side</h1>')
  })

  

app.get('/api/persons', (req, res) => {
    res.json(persons)
    console.log(persons)
    
})


//date

app.get('/info', (request, response) => {

    const date = new Date().toString()
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
            <p> ${date}</p>`)
})
// func

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)

    } else {
        response.status(404).end()
    }
})

//delete function

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

//id gen

const generateID = () => {
    const genID = Math.floor(Math.random() * 10000000000)+1

    return genID
}


//body
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateID(),
    }

    persons = persons.concat(person)

    response.json(person)
})


//port 
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})