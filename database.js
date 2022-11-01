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
    let promise = new Promise(function (resolve, reject) {
        db.query('SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Role, department.name AS Department, role.salary AS Salary, CONCAT(employeeManager.first_name, " ", employeeManager.last_name) AS Manager FROM employee JOIN role ON role.id=employee.role_id JOIN department ON department.id=role.department_id LEFT JOIN employee employeeManager ON employee.manager_id = employeeManager.id;', (err, result) => {
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

async function addEmployee () {

}

async function updateEmployeeRole () {

}

async function displayRoles () {
    let promise = new Promise(function (resolve, reject) {
        db.query('SELECT role.id AS ID, role.title AS Role, department.name AS Department, role.salary AS Salary FROM role JOIN department ON role.department_id=department.id', (err, result) => {
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
            if (err) {
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

async function addDepartment (name) {
    db.query('INSERT INTO department (name) VALUES (?)', name, (err, result) => {
        if (err) {
            console.error(err);
        }
    } )
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
