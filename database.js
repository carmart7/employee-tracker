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

async function displayEmployees () {

}

async function addEmployee () {

}

async function updateEmployeeRole () {

}

async function displayRoles () {
    let promise = new Promise(function (resolve, reject) {
        db.query('SELECT role.id AS ID, role.title AS Role, department.name as Department, role.salary as Salary FROM role JOIN department ON role.id=department.id', (err, result) => {
            if(err) {
                console.error(err);
                reject(err);
            }
                console.log('\n');
                console.table(result);
                resolve(result);
        });
    });
    return promise;
}

async function addRole () {

}

async function displayDepartments () {
    let promise = new Promise(function (resolve, reject) {
        db.query('SELECT id AS ID, name AS Department FROM department', (err, result) => {
            if(err) {
                console.error(err);
                reject(err);
            }
                console.log('\n');
                console.table(result);
                resolve(result);
        });
    });
    return promise;
}

async function addDepartment () {

}

function endConnection () {
    db.end();
}

module.exports = {
    displayEmployees,
    addEmployee,
    updateEmployeeRole,
    displayRoles,
    addRole,
    displayDepartments,
    addDepartment,
    endConnection
}
