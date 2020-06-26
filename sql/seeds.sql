USE company_db;

INSERT INTO employee (id, first_name, last_name, role_id) VALUES 
(1, "Steve", "Jobs", 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES 
(2, "Bill", "Gates", 2, 1), 
(3, "John", "Jay", 3, 1), 


INSERT INTO role (id, title, salary, department_id)
VALUES 
(1, "CEO", 25000, 1), 
(2, "Founder", 20000, 1), 
(3, "President", 15000, 2), 


INSERT INTO department (id, name)
VALUES 
(1, "Management"), 
(2, "Sales"), 