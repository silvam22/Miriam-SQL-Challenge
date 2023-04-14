const inquirer = require('inquirer')
const cTable = require('console.table')
const { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee } = require('./queries')

const questions = ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role', 'quit']
function start() {
    inquirer.prompt([{
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: questions
    }]).then((answer) => {
        switch (answer.option) {
            case 'view all departments':
                getDepartments().then(([row]) => {
                    console.table(row)
                })
                break;
            case 'view all roles':
                getRoles()
                break;
            case 'view all employees':
                getEmployees()
                break;
            case 'add a department':
                inquirer.prompt([{
                    name: "name",
                    type: "input",
                    message: "Enter department name:"
                }]).then((answer) => {
                    addDepartment(answer.name)
                })
                break;
            case 'add a role':
                getDepartments().then(([rows]) => {
                    const departments = rows.map((row) => {
                        return { name: row.name, value: row.id }
                    })
                    inquirer.prompt([{
                        name: "name",
                        type: "input",
                        message: "Enter role name:"
                    }, {
                        name: "salary",
                        type: "input",
                        message: "Enter role salary:"
                    }, {
                        name: "department",
                        type: "list",
                        message: "Select department",
                        choices: departments
                    }]).then((answer) => {
                        addRole(answer.name, answer.salary, answer.department)
                    })
                })

                break;
            case 'add an employee':
                const { addEmployee } = require('./queries');
                const readline = require('readline');
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                });

                rl.question('Enter the name of the new employee: ', (name) => {
                    addEmployee(name);
                    rl.close();
                });
                break;
            case 'update employee role':
                
                break;
            case 'quit':
                console.log('Goodbye!');
                process.exit();
                break;
        }
    })
}

start()