INSERT INTO department(name)
VALUES('HR'), ('Finance'), ('Operations'), ('IT');

INSERT INTO role(title, salary, department_id)
VALUES('HR Manager', 10000, 1), 
('Finance Manager', 10000,2), 
('Area Manager',10000,3),
('IT Manager', 10000,4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Miriam', 'Santana', 1, 3),
('Nancy', 'Santana', 2, 3),
('Fred', 'Santana', 3, NULL),
('Lisa', 'Santana', 4, 1);


