const Joi = require('joi');
const express = require('express');
const courses = require('./data');

const app = express();
app.use(express.json());

const validateCourse = (course) => {
    const schema = {
        name: Joi.string()
            .min(3)
            .required(),
    };

    return Joi.validate(course, schema);
};

app.get('/api/courses', (req, res) => {
    const { search } = req.query;
    let foundCourses = courses;
    if (search) {
        foundCourses = res.send(courses.filter(c => c.name.includes(search)));
    }
    res.send(foundCourses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === Number(req.params.id));
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

    const course = {
        id: courses.length + 1,
        ...value,
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === Number(req.params.id));
    if (!course) {
        res.status(404).send('Course with given ID is not found.');
        return;
    }

    const { error, value } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    Object.assign(course, value);

    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === Number(req.params.id));
    if (!course) {
        res.status(404).send('Course with given ID is not found.');
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
