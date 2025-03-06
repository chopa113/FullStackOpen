require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const Note = require('./models/note')
const People = require('./models/people')

const app = express();
const port = process.env.PORT

app.use(express.json());

morgan.token('body', req => {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/api/persons', (req, res) => {
  People.find({}).then(persons => {
    res.json(persons)
  })
});

app.get('/api/persons/:id', (req, res) => {
  People.findById(req.params.id).then(person => {
    res.json(person)
  })
});

app.get('/info', (req, res) => {
  People.find({}).then(persons => {
    res.send("Phonebook has info for " + persons.length + " people <br>" + new Date());
  })
});

app.delete('/api/persons/:id', (req, res) => {
  People.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
    })
});

app.post('/api/persons', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'name missing' });
  } else if (req.body.name || req.body.number) {
    People.findOne({ name: req.body.name })
      .then(existingPerson => {
        if (existingPerson) {
          return res.status(400).json({ error: 'Person already exists in the database' });
        } else {
          const person = new People({
            name: req.body.name,
            number: req.body.number
          });

          person.save()
            .then(savedPerson => {
              res.json(savedPerson);
            })
            .catch(error => {
              console.log(error);
              res.status(500).json({ error: 'An error occurred' });
            });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
      });
  }
  else if (!req.body.number) {
    return res.status(400).json({ error: 'number missing' });
  } else {
    const person = new People({
      name: req.body.name,
      number: req.body.number
    });

    person.save()
      .then(savedPerson => {
        res.json(savedPerson);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
      });
  }
});

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))

    const errorHandler = () => {
      console.error(error.message)

      if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })

      } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }

      next(error)
    }
});

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.get('/api/notes/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.listen(port, () => {
  console.log('Server running on port ' + port);
});