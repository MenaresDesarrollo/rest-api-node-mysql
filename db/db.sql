CREATE DATABASE IF NOT EXISTS company;

USE company;

create table employes (
	id INT (11) not null auto_increment,
    name VARCHAR(45) default null,
    salary INT(11) default null,
    primary key(id)
);

describe employes;
