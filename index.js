const express = require('express');
const courses = require('./data');

const app = express();

app.use(express.json());

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
    if (!course) res.status(404).send('Course with given ID is not found.');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { name } = req.body;

    if (!name || name.length < 3) {
        // 400 Bad Request
        res.status(400).send('Name is required and should be minimum 3 characters long.');
        return;
    }

    const course = {
        id: courses.length + 1,
        name,
    };

    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
