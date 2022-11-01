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
]

const addQuestion = [
    {message: 'What is the name of the department?', name: 'name'}
]

module.exports = {
    baseQuestions,
    addQuestion,
}