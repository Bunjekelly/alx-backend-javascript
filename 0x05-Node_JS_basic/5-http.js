// create a small HTTP server using the http module 

const http = require('http');
const url = require('url');
const countStudents = require('./3-read_file_async');

const DATABASE_PATH = './database.csv';

const app = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/') {
        res.end('Hello Holberton School!');
    } else if (req.url === '/students') {
        countStudents(DATABASE_PATH)
            .then((studentData) => {
                res.write('This is the list of our students\n');
                res.write(`Number of students: ${studentData.total}\n`);
                for (const [field, students] of Object.entries(studentData.fields)) {
                    res.write(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`);
                }
                res.end();
            })
            .catch((error) => {
                res.end(error.message);
            });
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }
});

app.listen(1245);

module.exports = app;