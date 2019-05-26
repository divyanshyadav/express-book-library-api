const express = require('express');
const { validateCourse } = require('./validators');
const createLocalDB = require('./createLocalDB');

const courses = createLocalDB('./data.json');

const app = express();
app.use(express.json());

app.get('/api/courses', (req, res) => {
    const { search } = req.query;
    let foundCourses = courses.get();
    if (search) {
        foundCourses = foundCourses.filter(c => c.name.includes(search));
    }
    res.send(foundCourses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.get(Number(req.params.id));
    if (!course) {
        res.status(404).send('Course with given ID is not found.');
        return;
    }
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error, value } = validateCourse(req.body);

    if (error) {
        // 400 Bad Request
        res.status(400).send(error.details[0].message);
    }

    const newCourse = courses.insert(value);
    res.send(newCourse);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.get(Number(req.params.id));
    if (!course) {
        res.status(404).send('Course with given ID is not found.');
        return;
    }

    const { error, value } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    const updatedCourse = {
        ...course,
        ...value,
    };

    courses.update(updatedCourse);
    res.send(updatedCourse);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.get(Number(req.params.id));
    if (!course) {
        res.status(404).send('Course with given ID is not found.');
        return;
    }

    courses.delete(course);
    res.send(course);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
