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
            case "Add an employee":
                var query = connection.query("SELECT id, title FROM role", function (err, data) {
                    if (err) throw err;
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "firstName",
                            message: "Enter the employee's first name",

                        },
                        {
                            type: "input",
                            name: "lastName",
                            message: "Enter the employee's last name",
                        },
                        {
                            type: "list",
                            name: "role",
                            message: "Select this employee's role:",

                        }
                    ]).then(function (data) {
                        var array = data.role.split(" ");
                        var roleID = parseInt(arr[0]);
                        var query = connectionl.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
                        ('${data.firstName}', '${data.lastName}', ${roleID}, 0)`, function (err, data) {
                            if (err) throw err;
                            console.log("Employee has been added to the table");
                        })
                    })
                });
                break;
            // case "Add a role":

            // case "Add a department":
        }
    })

}
