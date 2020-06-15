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
        }
    })

}
