USE company_db;

INSERT INTO employee (id, first_name, last_name, role_id) VALUES 
(1, "George", "Washington", 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES 
(2, "John", "Adams", 2, 1), 
(3, "John", "Jay", 3, 1), 


INSERT INTO role (id, title, salary, department_id)
VALUES 
(1, "President", 25000, 1), 
(2, "Vice President", 20000, 1), 
(3, "Secretary of State", 15000, 2), 


INSERT INTO department (id, name)
VALUES 
(1, "Executive"), 
(2, "State"), 