/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const createLocalDB = require('./createLocalDB');
const { validateBook } = require('./validators');

const books = createLocalDB('./data.json');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/books', (req, res) => {
    const { search } = req.query;
    res.send(books.search(search, ['name', 'author']));
});

app.get('/api/books/:id', (req, res) => {
    const course = books.get(Number(req.params.id));
    if (!course) {
        res.status(404).send('Course with given ID is not found.');
        return;
    }
    res.send(course);
});

app.post('/api/books', (req, res) => {
    const { error, value } = validateBook(req.body);

    if (error) {
        // 400 Bad Request
        res.status(400).send(error.details[0].message);
    }

    const newCourse = books.insert(value);
    res.send(newCourse);
});

app.put('/api/books/:id', (req, res) => {
    const course = books.get(Number(req.params.id));
    if (!course) {
        res.status(404).send('Course with given ID is not found.');
        return;
    }

    const { error, value } = validateBook(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    const updatedCourse = {
        ...course,
        ...value,
    };

    books.update(updatedCourse);
    res.send(updatedCourse);
});

app.delete('/api/books/:id', (req, res) => {
    const course = books.get(Number(req.params.id));
    if (!course) {
        res.status(404).send('Course with given ID is not found.');
        return;
    }

    books.delete(course);
    res.send(course);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
