const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions } = require('./questions')
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
    let employee = await inquirer.prompt(addEmployeeQuestions);
    let roles = await getRoles();
    let employees = await getEmployees();
    let roleList = [];
    for(let i = 0; i < roles.length; i++) {
        let obj = {};
        obj.name = `${roles[i].title}`;
        obj.value = `${roles[i].id}`;
        roleList.push(obj);
    }
    let employeeList = [{name: 'none', value: 'null'}];
    for(let i = 0; i < employees.length; i++) {
        let obj = {};
        obj.name = `${employees[i].name}`;
        obj.value = `${employees[i].id}`;
        employeeList.push(obj);
    }

    let employeeRoleID = (await inquirer.prompt({message: 'What role will the employee have?', name: 'id', type:'list', choices: roleList})).id;
    let employeeManagerID = (await inquirer.prompt({message: 'Who is the manager?', name: 'id', type:'list', choices: employeeList})).id;
    let promise = new Promise (function (resolve, reject) {
        if(employeeManagerID == 'null') {
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, null)', [employee.firstName.trim(), employee.lastName.trim(), employeeRoleID], (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                console.log(`Added ${employee.firstName} ${employee.lastName} to the database`);
                resolve(result);
            });
        } else {
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [employee.firstName, employee.lastName, employeeRoleID, employeeManagerID], (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                console.log(`Added ${employee.firstName} ${employee.lastName} to the database`);
                resolve(result);
            });
        }
    });
    return promise;
}

async function updateEmployeeRole () {
    let employees = await getEmployees();
    let roles = await getRoles();
    let employeeList = [];
    for(let i = 0; i < employees.length; i++) {
        let obj = {};
        obj.name = `${employees[i].name}`;
        obj.value = `${employees[i].id}`;
        employeeList.push(obj);
    }
    let roleList = [];
    for(let i = 0; i < roles.length; i++) {
        let obj = {};
        obj.name = `${roles[i].title}`;
        obj.value = `${roles[i].id}`;
        roleList.push(obj);
    }

    let employeeChosen = (await inquirer.prompt({message: "Which employee's role would you like to update?", name: 'id', type:'list', choices: employeeList}));
    let roleID = (await inquirer.prompt({message: "Which role do you want to assign the selected employee?", name: 'id', type:'list', choices: roleList})).id;
    let promise = new Promise(function (resolve, reject) {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleID, employeeChosen.id], (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            console.log(`Updated ${employeeChosen.name} in the database`);
            resolve(result);
        });
    })
    return promise;
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
    let role = await inquirer.prompt(addRoleQuestions);
    let departments = await getDepartments();
    let departmentList = [];
    for(let i = 0; i < departments.length; i++) {
        let obj = {};
        obj.name = `${departments[i].department}`;
        obj.value = `${departments[i].id}`;
        departmentList.push(obj);
    }

    let roleDepartmentID = (await inquirer.prompt({message: 'What department is the role in?', name: 'id', type:'list', choices: departmentList})).id;
    let promise = new Promise(function (resolve, reject) {
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [role.name.trim(), role.salary.trim(), roleDepartmentID], (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            console.log(`Added ${role.name.trim()} to the database`);
            resolve(result);
        });
    });
    return promise;
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

async function addDepartment () {
    let name = (await inquirer.prompt(addDepartmentQuestions)).name.trim();
    db.query('INSERT INTO department (name) VALUES (?)', name, (err, result) => {
        if (err) {
            console.error(err);
        }
        console.log(`Added ${name} to the database`);
    } )

}

async function getDepartments () {
    let promise = new Promise(function (resolve, reject) {
        db.query('SELECT id, name AS department FROM department', (err, result) => {
            if (err) {
                reject(err);
            }
                resolve(result);
        });
    });
    return promise;
}

async function getRoles () {
    let promise = new Promise(function (resolve, reject) {
        db.query('SELECT id, title FROM role', (err, result) => {
            if (err) {
                reject(err);
            }
                resolve(result);
        });
    });
    return promise;
}

async function getEmployees () {
    let promise = new Promise(function (resolve, reject) {
        db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, result) => {
            if (err) {
                reject(err);
            }
                resolve(result);
        });
    });
    return promise;
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
