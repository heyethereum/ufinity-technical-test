/**
 * If you are not familiar with database design, you may skip this question.
 *
 *
 * You are designing the database for a simple Internet service provider, according to the following
 * business rules:
 *  1. A customer can subscribe to one or more plans
 *  2. A plan consists of one or more services
 *  3. The same service can be in multiple plans
 *
 * The tasks for this question are
 *  1. Describe how you would design the database tables for the company. 
 *     List the tables, with their fields and types below. 
 *     Indicate any constraints and foreign keys to other tables.
 *  2. Based on your table design, write an SQL query to get the list of unique customers who
 *     subscribed to the "unlimited music" service
 */

CREATE DATABASE telco;

use telco;

show tables;

/* Five basic tables with basic minimal attributes are created below */

/* 
customers table show all customers a telco has with some basic customer information 
*/

CREATE Table IF NOT EXISTS telco.customers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    phone VARCHAR(200)
);

/* 
plans table shows all the plans which telco offers with some basic attributes 
*/

CREATE Table IF NOT EXISTS telco.plans (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
    name VARCHAR(200) NOT NULL,
    base_price DECIMAL(10, 2) NOT NULL
);

/* 
services table shows all services that the telco offers with some basic attributes 
*/

CREATE Table IF NOT EXISTS telco.services (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
    name VARCHAR(200) NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    one_time_registration DECIMAL(10, 2)
);

/* 
plan_services table stores all the plans consists of different services. One plan can have one or many services and each service can only be in a plan once, constrainted by primary key 
*/

CREATE Table IF NOT EXISTS telco.plan_services (
    id INT NOT NULL AUTO_INCREMENT UNIQUE,
    plan_id INT,
    service_id INT,
    PRIMARY KEY (plan_id, service_id),
    FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE ON UPDATE CASCADE
);

/* subscription table shows all the plans customer subcribed to */

CREATE Table IF NOT EXISTS telco.subscription (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
    customer_id INT,
    plan_id INT,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE ON UPDATE CASCADE
);

DESCRIBE subscription;

drop table subscription;

drop table plan_services;

INSERT INTO
    customers (name, email, phone)
VALUES
    ("Alex Lim", "alex@gmail.com", "12345678"),
    ("Bobby Lim", "bobby@gmail.com", "22345678"),
    ("Cherry Lim", "cherry@gmail.com", "32345678"),
    ("Daniel Lim", "daniel@gmail.com", "42345678"),
    ("Elaine Lim", "elaine@gmail.com", "52345678");

SELECT * FROM services;

select * from plans;

INSERT INTO
    plans (name, base_price)
VALUES
    ("Plan 1", 10),
    ("Plan 2", 20),
    ("Plan 3", 30);

INSERT INTO
    services (name, price, one_time_registration)
VALUES
    ("Caller ID", 5, NULL),
    ("Caller Non-ID", 5, NULL),
    ("unlimited WhatsApp", 5, 5),
    ("unlimited music", 10, 5),
    ("unlimited video", 10, 5);

INSERT INTO
    plan_services (plan_id, service_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 2),
    (2, 4),
    (3, 1),
    (3, 2),
    (3, 3),
    (3, 4),
    (3, 5);

select * from plan_services where service_id = 4;

INSERT INTO
    subscription (customer_id, plan_id, start_date)
VALUES
    (1, 1, "2022-8-10"),
    (2, 2, "2022-8-10"),
    (3, 3, "2022-8-10"),
    (4, 1, "2022-8-10"),
    (4, 2, "2022-8-10"),
    (5, 2, "2022-8-10"),
    (5, 3, "2022-8-10");

/* 
SQL Statement to list customers who subscribed to "unlimited music" service 
*/

SELECT
    customers.name,
    services.name,
    plans.name
FROM
    customers
    INNER JOIN subscription ON subscription.customer_id = customers.id
    INNER JOIN plan_services ON plan_services.plan_id = subscription.plan_id
    INNER JOIN plans ON plans.id = subscription.plan_id
    INNER JOIN services ON services.id = plan_services.service_id
WHERE
    services.name = "unlimited music"
ORDER BY
    customers.name