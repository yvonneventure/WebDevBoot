# Database

- [**SQL database**](https://github.com/yvonneventure/WebDevBootCamp/new/main#sql-structured-query-language): MySQL, PostgreSQL
- [**NoSQL database**](https://github.com/yvonneventure/WebDevBootCamp/new/main#nosql-not-only-structured-query-language): MongoDB, redis

### Database actions (CRUD)
- Create
- Read
- Update
- Destroy


### Difference between SQL and NoSQL

####  📌Structure :<img width="240" alt="Screen Shot 2022-09-30 at 14 53 46" src="https://user-images.githubusercontent.com/103771536/193337750-1e7f1ed9-8fd1-440b-8bef-08f8d3ddcd50.png">

- **SQL**
  - group data into tables
  - can be inflexible when adding column, or when one column missing value (insert null values)
- **NOSQL**
  - like json data, can be very flexible
  - good for startups, when you don't know the structure or pivoting
  
  

####  📌Relationships: 
- **SQL** : Relational Database 
  - Good at managing relations
  - Tend to group data into different tables rather than have one big table that holds lots of replicated information
  - use ids/primary keys to build the relationship
![IMG_4144](https://user-images.githubusercontent.com/103771536/193017008-0acc8918-9da2-4cc8-8acd-0ca66a4c67eb.jpg)

- **NOSQL** :Non-relational 
  - Can be clumsy and messy when building relationships
  - Not as easy actionable as SQL
  - Great for **One to Many** relationship (like one person create lots of posts)
![IMG_4145](https://user-images.githubusercontent.com/103771536/193017023-0da259ce-4b91-456f-ae19-edb13cffc9a5.jpg)

####  📌Scalability: 
- **SQL** :
  - rows are built vertically and can cost a lot when data grow vertically, like over 1m records
- **NOSQL** :
  - allow documents/objects distributed and spread out, like grow horizontally 

![IMG_4146](https://user-images.githubusercontent.com/103771536/193017053-31fceb40-0f5e-47ad-90b8-1b1cfe554af6.JPG)



## SQL (Structured Query Language)

W3Schools [on SQL](https://www.w3schools.com/sql/)

#### Create Table and Insert data

- [Data Types in SQL](https://www.w3schools.com/sql/sql_datatypes.asp)
- [Primary Keys in SQL](https://www.w3schools.com/sql/sql_primarykey.asp) : Uniquely identiy each record in the table
- [Insert Into in SQL](https://www.w3schools.com/sql/sql_insert.asp)

```sql
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
   ....
);

--example CREATE TABLE
CREATE TABLE products (
    ID INT NOT NULL,
    Name STRING,
    Price MONEY,
    PRIMARY KEY (ID)
);

--INSERT INTO seleted columns

INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

--INSERT INTO all columns

INSERT INTO products 
VALUES (1, "Pen", 1.20);
```

#### Read data use SELECT and WHERE

```sql

-- Read everythin from table

SELECT * FROM products;

-- Read selected columns from table

SELECT Name, Price FROM products;

-- Read selected rows from table

SELECT * FROM products
WHERE ID=1;

```


#### Update data

[UPDATE in SQL](https://www.w3schools.com/sql/sql_update.asp)

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;

-- ❗️no WHERE clause will cause all rows updated
```

##### Add Column

Add column in SQL means alter the table

The `ALTER TABLE` statement is used to **add, delete, or modify columns** in an existing table.

[ALTER TABLE in SQL](https://www.w3schools.com/sql/sql_alter.asp)

```sql
-- Add Column

ALTER TABLE table_name
ADD column_name datatype;

-- Delete Column

ALTER TABLE table_name
DROP COLUMN column_name;

```


#### Delete data

```sql
-- delete certain rows

DELETE FROM table_name WHERE condition;

-- ❗️no WHERE clause will cause all rows deleted
```

### Relationships, Foreign Key, Joins

A `FOREIGN KEY` is a field (or collection of fields) in one table, that refers to the `PRIMARY KEY` in another table.

[FOREIGN KEY in SQL](https://www.w3schools.com/sql/sql_foreignkey.asp)

```sql
CREATE TABLE Orders (
    OrderID int NOT NULL,
    OrderNumber int NOT NULL,
    PersonID int,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
);

--To create a FOREIGN KEY constraint on the "PersonID" column when the "Orders" table is already created

ALTER TABLE Orders
ADD FOREIGN KEY (PersonID) REFERENCES Persons(PersonID);
```

A **JOIN** is used to combine rows from two or more tables, based on a related column between them.

[Joins in SQL](https://www.w3schools.com/sql/sql_join.asp)

```sql
-- Inner Join 
-- select all orders of a particular customer

SELECT Orders.OrderID, Customers.CustomerName  -- columns you need
FROM Orders  --the table has foreign key
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;  --another table 
```


## NOSQL (Not Only Structured Query Language) 

### MongoDB Shell (mongosh)

Run `mongosh` in shell to connnect to local mongoDB and get into the mongosh termianl.

Perform [CRUD use mongoDB](https://www.mongodb.com/docs/mongodb-shell/crud/) shell (mongosh)

Use "new tab" to get into the normal shell.

In `mongosh` shell: 

```shell
show dbs  //-- show database names
show collections  //--show collections in current database
use <db_name>  // --set and use the database
db.<collection_name>.find()  // show all the objects
```


<img width="198" alt="Screen Shot 2022-09-30 at 14 54 23" src="https://user-images.githubusercontent.com/103771536/193337838-b7db485c-353b-4749-b324-e4b481f877c3.png">


Use `Ctrl+C` to exit mongo shell.


### Mongoose

Instead of doing thing in mongo shell, we can actually use [**Mongoose**](https://mongoosejs.com/docs/guide.html) to use in our js script.

[Data validation](https://mongoosejs.com/docs/validation.html) at schema level.

CRUD operation at [model](https://mongoosejs.com/docs/api/model.html) level.

Run `node app.js` for the script to be executed.

```js
//#### -----------Create  ----------------//
const mongoose = require('mongoose');

// connect to db, DB name is "test"
mongoose.connect('mongodb://localhost:27017/test');

//first, create schema  => like a blueprint, what will our data/document look like
// methods need to be at schema level
// data validation at schema level, object failed the validation will not be added to the collection
const kittySchema= new mongoose.Schema({
  name: {
    type:String,    
    required:[true, "no name specified"],   //name is required, will return "no name specified" error message
  },
  age: {
    type: Number,   // age need to between 1-10
    min: 1,
    max: 10
  },
  comment: String,
});


//create model from the schema, like a class/collection
/// collection name has to be single, and then Mongoose will turn it into lower case and plural
const Cat = mongoose.model('Cat', kittySchema);


// create a new object/document kitty from model/class with name "Zildjian" or individual record
// => insert one record
const kitty = new Cat({ name: 'Zildjian' , age:3});

// save to DB (only need once, otherwise will save several records in the collection)
kitty.save()


const kit = new Cat({ name: 'sedsds' , age:3});
const ty = new Cat({ name: 'Zils' , age:3});

// to add them to colleaction in bulk
//=> array of all the documents need to be added, and a callback function
Cat.insertMany([kit,ty], function(err){
  console.log(err});

//#### ------------Read  ----------------//

//find all the records in Cat class/collection
//the output is an array kittens, can be called anything
Cat.find(function(err,kittens){
  if (err){
    console.log(err);
  }else {
    mongoose.disconnect();  // disconnect the mongo server
  kittens.forEach(function(kit){
    console.log(kit.name);
  });


//#### --------Update ----------------//
// what record you want to update, the data to be updated, a callback function
Cat.updateOne({_id:"63137503b9a25262035578df"},{name:"good"},function (err){console.log(err)});


//#### --------Delete ----------------//
// the record to be deleted
Cat.deleteOne(  {_id:"63137503b9a25262035578df"}, function (err) {console.log(err)} );
Cat.deleteMany(  {name: 'Zildjian'}, function (err) {console.log(err)} );  // delete all records where name is Zildjian


// ###------------------Add Relationship-------------------//

// add schema to schema
const personSchema= new mongoose.Schema({
  name: String,
  age: Number,
  favouriteCat: kittySchema
});

const Person = mongoose.model('Person', personSchema);


const people = new Person({ name: 'Amy' , age:34, favouriteCat:kitty});

// save to DB,
people.save()
console.log('added a person'));

```




































