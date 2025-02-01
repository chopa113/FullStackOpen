const http = require('http')

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const app = http.createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/api/persons') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(persons))
  }else if (request.method === 'GET' && request.url === '/info') {
    const date = new Date()
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
  }
  else {
    response.writeHead(404)
    response.end()
  }
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)