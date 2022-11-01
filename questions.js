const baseQuestions = [
    {message: 'What would you like to do?', name: 'choice', type: 'list', choices: [
        {name: 'View All Employees', value: 'viewEmployees'},
        {name: 'Add Employee', value: 'addEmployee'},
        {name: 'Update Employee Role', value: 'updateEmployeeRole'},
        {name: 'View All Roles', value: 'viewRoles'},
        {name: 'Add Role', value: 'addRole'},
        {name: 'View All Departments', value: 'viewDepartments'},
        {name: 'Add Department', value: 'addDepartment'},
        {name: 'Exit', value: 'exit'}
    ]}
];

const addDepartmentQuestions = [
    {message: 'What is the name of the department?', name: 'name'}
];

const addRoleQuestions = [
    {message: 'What is the name of the role?', name: 'name'},
    {message: 'What is the salary of the role?', name: 'salary'}
];

module.exports = {
    baseQuestions,
    addDepartmentQuestions,
    addRoleQuestions
}