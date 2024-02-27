// a function countStudents in the file 2-read_file.js

const fs = require('fs');

function countStudents(path) {
    let data;

    try {
        data = fs.readFileSync(path, 'utf8');
    } catch (err) {
        throw new Error('Cannot load the database');
    }

    let lines = data.split('\n');
    lines = lines.filter((line) => line); // Remove empty lines

    const students = lines.slice(1); // Remove header line

    console.log(`Number of students: ${students.length}`);

    const fields = {};

    for (const student of students) {
        const [id, firstname, age, field] = student.split(',');

        if (!fields[field]) {
            fields[field] = [];
        }

        fields[field].push(firstname);
    }

    for (const [field, students] of Object.entries(fields)) {
        console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }
}

countStudents('database.csv');

module.exports = countStudents;