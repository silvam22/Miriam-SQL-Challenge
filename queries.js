const mysql = require('mysql2')
const { db_password } = require('./config')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employees_db',
    password: db_password
})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('The db is connected')
})

module.exports = {
  async getDepartments() {
     let result = await db.promise().query('SELECT * FROM department')
            return result
    },
    getRoles() {
        db.query(`
        SELECT role.id, role.title, department.name AS department,
        role.salary FROM role INNER JOIN department 
        ON role.department_id=department.id`, (err, res) => {
            if (err) {
                throw err
            }
            console.table(res)
        })
    },
    getEmployees(){
        db.query(`
        SELECT employee.id, employee.first_name, employee.last_name, 
        role.title, department.name AS department,
        role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee INNER JOIN role  
        ON employee.role_id=role.id
        INNER JOIN department ON role.department_id=department.id
        LEFT JOIN employee manager ON employee.manager_id=manager.id`, (err, res) => {
            if (err) {
                throw err
            }
            console.table(res)
        })
    },
    addDepartment(name){
        db.query('INSERT INTO department SET name=?',[name],(err)=>{
            if (err) {
               throw err 
            }
            console.log('Department added successfully')
        })
    },
    addRole(name, salary, department){
        db.query('INSERT INTO role SET title=?, salary=?, department_id=?',[name, salary, department],(err)=>{
            if (err) {
               throw err 
            }
            console.log('Role added successfully')
        })
    },
    addEmployee (name) {
        const [first_name, last_name] = name.split(' ');
        const sql = 'INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)';
        const values = [first_name, last_name, 1]; // assume the default role_id is 1
        db.query(sql, values, (error, results, fields) => {
          if (error) {
            console.error(error);
            return;
          }
          console.log(`New employee ${name} added with ID ${results.insertId}`);
        });
    },
   
}