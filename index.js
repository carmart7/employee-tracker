const inquirer = require('inquirer');
const { displayEmployees, addEmployee, updateEmployeeRole, displayRoles, addRole, displayDepartments, addDepartment, endConnection } = require('./database');
const { baseQuestions } = require('./questions');



//program starts with user running the index.js with node

// User is asked "What would you like to do? (Use arrow keys)"
// User then selects from list if they want to
// View All Employees
// User will be shown a table with every department and the respective id
// Add Employee
// Update Employee Role
// View All Roles
// User will be shown a table with every role and the respective id, 
// joined with the matching department and salary
// Add Role
// View All Departments
// Add Department


async function init() {
    let choice = (await inquirer.prompt(baseQuestions)).choice;
    while (choice != 'exit') {
        switch(choice) {
            case 'viewEmployees':
                await displayEmployees();
                choice = (await inquirer.prompt(baseQuestions)).choice;
                break;
            case 'addEmployee':
                await addEmployee();
                choice = (await inquirer.prompt(baseQuestions)).choice;
                break;
            case 'updateEmployeeRole':
                await updateEmployeeRole();
                choice = (await inquirer.prompt(baseQuestions)).choice;
                break;
            case 'viewRoles':
                await displayRoles();
                choice = (await inquirer.prompt(baseQuestions)).choice;
                break;
            case 'addRole':
                await addRole();
                choice = (await inquirer.prompt(baseQuestions)).choice;
                break;
            case 'viewDepartments':
                await displayDepartments();
                choice = (await inquirer.prompt(baseQuestions)).choice;
                break;
            case 'addDepartment':
                await addDepartment();
                choice = (await inquirer.prompt(baseQuestions)).choice;
                break;
        }
    }
    endConnection();
}

init();