const inquirer = require("inquirer");

const consoleTable = require("console.table");

const inquirer = require("inquirer");

//Connect to mysql server
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "company_db"
});

//Validation for strings

function validateString(data) {
    if (data != "" && isNaN(parseInt(data))) {
        return true;
    }

    return false;
}

//Validation for numbers
function validateNumbers(data) {
    if (data != "" && !isNaN(parseInt(answer))) {
        return true;
    }
    return false;
}

function questions() {
    inquirer.prompt ([
        {
            type: "list",
            name: "topMenu",
            message: "Please select one of the following options:",
            choices: [
                "View all employees",
                "View all roles",
                "View all departments",
                "Add an employee",
                "Add a role",
                "Add a department",
                "Update employee role"
            ]
        }
    ]).then(function (answer) {
        switch (answer.mainMenu) {

            //Views, all very similar
            case "View all":
                var query = connection.query("SELECT * FROM employee", function (err, data) {
                    if (err) throw err;
                    console.table(data);
                });
                break;

            case "View all roles":
                var query = connection.query("SELECT * FROM role", function (err, data) {
                    if (err) throw err;
                    console.table(data);
                });
                break;
            case "View all departments":
                var query = connection.query("SELECT * FROM department", function (err, data) {
                    if (err) throw err;
                    console.table(data);
                });
                break;
                //How to add an employee
            case "Add an employee":
                var query = connection.query("SELECT id, title FROM role", function (err, data) {
                    if (err) throw err;
                    let choices = data.map(x => `${x.id} -${x.title}`)
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "firstName",
                            message: "Enter the employee's first name",
                            validate: "validateString"

                        },
                        {
                            type: "input",
                            name: "lastName",
                            message: "Enter the employee's last name",
                            validate: "validateString"
                        },
                        {
                            type: "list",
                            name: "role",
                            message: "Select this employee's role:",
                            choices: [...choices]
                        }
                    ]).then(function (data) {
                        var array = data.role.split(" ");
                        var roleID = parseInt(array[0]);
                        var query = connectionl.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
                        ('${data.firstName}', '${data.lastName}', ${roleID}, 0)`, function (err, data) {
                            if (err) throw err;
                            console.log("Employee has been added to the table");
                        });
                    });
                });
                break;
                //How to add a role
            case "Add a role":
                var query = connection.query("SELECT id, department FROM department", function (err,data) {
                    if (err) throw err;
                    let choices = data.map(x => `${x.id} -${x.department}`);
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "title",
                            message: "Enter the role name:",
                            validate: "validateString"
                        },
                        {
                            type: "input",
                            name: "salary",
                            message: "Enter the salary for this role:",
                            validate: "validateNumber"
                        },
                        {
                            type: "list",
                            name: "department",
                            message: "Select the department for this role:",
                            choices: [...choices]
                        }
                    ]).then(function (data) {
                        var array = data.department.split(" ");
                        var departmentID = parseInt(array[0]);
                        var query = connection.query(`INSERT INTO role (title, salary, department_id) 
                        VALUES ('${data.title}', '${data.salary}'), ${departmentID}`, function (err, data) {
                            if (err) throw err;
                            console.log("Role has successfully been added to the table")
                        })
                    })
                })
                //How to add a department
            case "Add a department":
                inquirer.prompt([
                    {
                        type: "input",
                        name: "department",
                        message: "Enter the department's name:",
                        validate: validateString
                    }
                ]).then(function (data) {
                    var query = connection.query(`INSERT INTO department (department) VALUES ('${data.department}');`,
                    function (err, data) {
                        if (err) throw err;
                        return data;
                    })

                    console.log("Department has successfully been added to the list")
                });
                break;

            case "Update employee role":
                //create a constant for employee and fill it
                const emp = {
                    first_name: "",
                    last_name: "",
                    role_id: 0,
                    manager_id: 0,
                    employeeID: 0
                };
                var query = connection.query("SELECT id, first_name, last_name FROM employee", function (err, data) {
                    if (err) throw err;
                    let choices = data.map ( x=> `${x.id} - ${x.first_name} ${x.last_name}`);
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "employeeName",
                            message: "Select an employee:",
                            choices: [...choices]
                        }
                    ]).then(function (data) {
                        var array = data.employeeName.split(" ");
                        emp.employeeID = parseInt(array[0]);
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "firstName",
                                message: "Enter the employee's updated first name:",
                                validate: "validateString"
                            }
                        ])                    
                    })
                })
        }
    })

}
