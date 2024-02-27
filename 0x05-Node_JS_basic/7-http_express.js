// recreate the small HTTP server using Express

const express = require('express');
const countStudents = require('./3-read_file_async');

const DATABASE_PATH = './database.csv';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
    countStudents(DATABASE_PATH)
        .then((studentData) => {
            let response = 'This is the list of our students\n';
            response += `Number of students: ${studentData.total}\n`;
            for (const [field, students] of Object.entries(studentData.fields)) {
                response += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
            }
            res.send(response);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

app.listen(1245, () => {
    console.log('Server running on port 1245');
});

module.exports = app;