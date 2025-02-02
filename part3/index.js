const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3001;

app.use(express.json());

morgan.token('body', req => {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

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

app.get('/api/persons', (req, res) => {
  res.send(persons);
});

app.get('/api/persons/:id', (req, res) => {
  res.send(persons[req.params.id - 1]);
});

app.get('/info', (req, res) => {
  res.send("Phonebook has info for " + persons.length + " people <br>" + new Date());
});

app.delete('/api/persons/:id', (req, res) => {
  delete persons[req.params.id - 1];
  res.send('Deleted person with id ' + req.params.id);
});

app.post('/api/persons', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'name missing' });
  }
  else if (!req.body.number) {
    return res.status(400).json({ error: 'number missing' });
  }
  else if (persons.find(person => person.name === req.body.name)) {
    return res.status(400).json({ error: 'name must be unique' });
  }
  const person = req.body;
  person.id = Math.floor(Math.random() * 1000).toString();
  persons.push(person);
  res.send(person);
});

app.listen(port, () => {
  console.log('Server running on port ' + port);
});