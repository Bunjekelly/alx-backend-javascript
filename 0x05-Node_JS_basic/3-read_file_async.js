// a function countStudents in the file

const fs = require('fs');
const csv = require('csv-parser');

const countStudents = (path) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(path)) {
      reject(Error('Cannot load the database'));
    }

    let data = [];
    fs.createReadStream(path)
      .pipe(csv())
      .on('data', (row) => data.push(row))
      .on('end', () => {
        let studentsCount = data.length;
        console.log(`Number of students: ${studentsCount}`);

        let fields = {};
        data.forEach((student) => {
          if (student.field) {
            if (!fields[student.field]) {
              fields[student.field] = [];
            }
            fields[student.field].push(student.firstname);
          }
        });

        Object.entries(fields).forEach(([field, students]) => {
          console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
        });

        resolve();
      });
  });
};