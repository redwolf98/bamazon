CREATE DATABASE IF NOT EXISTS bamazon;
CREATE database IF NOT EXISTS bamazon;
USE bamazon;

DROP TABLE IF EXISTS wishlist;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS lu_departments;
DROP TABLE IF EXISTS lu_roles;



CREATE TABLE IF NOT EXISTS lu_roles(
	id INT NOT NULL,
    description VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO lu_roles(id, description)
VALUES 	(1,"Customer"),
		(2, "Minor"),
        (3, "Manager"),
        (4, "Supervisor");

CREATE TABLE IF NOT EXISTS lu_departments(
	id INT NOT NULL,
    description VARCHAR(100) NOT NULL,
    Primary Key (id)
);

INSERT INTO lu_departments (id, description)
VALUES 	(1, "Sports"),
		(2, "Pets"),
        (3, "Therapeutics"),
        (4, "Hunting"),
        (5, "Valentine's Day"),
        (6, "Literature"),
        (7,"Video Games"),
        (8,"Movies"),
        (9,"Furniture - Bedroom"),
        (10,"Toys");


CREATE TABLE IF NOT EXISTS products(
	item_id INT auto_increment,
	product_name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,
    price DECIMAL (10,4) NOT NULL,
    stock_quantity INTEGER NOT NULL,    
    PRIMARY KEY (item_id),
	foreign key (department_id)
		REFERENCES lu_departments (id)
        ON DELETE CASCADE
);

INSERT INTO products (product_name, department_id, price, stock_quantity)
VALUES 
	("Golf Balls 3-pack",1,5.99,50),
    ("Monkey Food",2,7.50,23),
    ("DIY Hydrotherapy Kits",3,232.50,10),
    ("Colt AR-15",4,599.00,30),
    ("Rat Poison",5,2.99,73),
    ("Harry Potter on Vacation",6,20.99,7),
    ("Mass Effect 7 - Death of the Cash Cow",7,10.99,231),
    ("Batman Continues",8,24.99,17),
    ("Half-Size King Mattresses",9,399.99,10),
    ("Binging Barbie",10,34.99,23);
    
    
CREATE TABLE IF NOT EXISTS users(
	id INT auto_increment,
    email VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role_id INT NOT NULL,
    primary key (id),
    foreign key (role_id) REFERENCES lu_roles(id) ON DELETE CASCADE
);


INSERT INTO users(name,email,password,role_id)
VALUES ('Tony','tony@bootcamp.com','test',4),
		('Jeff','customer@bootcamp.com','test',1),
        ('William','minor@bootcamp.com','test',2),
        ('Patrick','manager@bootcamp.com','test',3);

 CREATE TABLE IF NOT EXISTS cart(
	id INT auto_increment,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    orderAmount INT NOT NULL,
    primary key (id),
    foreign key (user_id) REFERENCES users (id) ON DELETE CASCADE,
    foreign key (product_id) REFERENCES products (id) ON DELETE CASCADE,
    INDEX (user_id)
 );

CREATE TABLE IF NOT EXISTS wishlist(
	id INT auto_increment,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX (user_id)
);
