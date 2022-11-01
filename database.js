const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: `${process.env.MYSQL_PASS}`,
        database: 'departments_db'
    }
);

async function displayDepartments () {
    let promise = new Promise(function (resolve, reject) {
        db.query('SELECT id AS ID, name AS Department FROM department', (err, result) => {
            if(err) {
                console.error(err);
                reject(err);
            }
                console.table(result);
                resolve(result);
        });
    });
    return promise;
}

function endConnection () {
    db.end();
}

module.exports = {
    displayDepartments,
    endConnection
}
