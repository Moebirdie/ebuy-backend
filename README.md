# E-commerce Back End Code


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This application demonstrates the use of Express.js, Sequelize and MySQL to create the backend APIs to support an eCommerce site. More importantly this application focuses on the use of ORMs (Object Relational Mapping tools) and their ability to connect object oriented programming to interact with a relational database.  The API calls included in this application include all CRUD operations for each table. This application is intended to be using in conjunction with a front-end to display, update and remove information from a database.  The responses are intended to be used to display appropriate information once the action is completed.


Link to video recording: [Video Recording]()  
Link to live README: [https://moebirdie.github.io/Inquirer-README-Generator/]()


## Table of Contents

1. [Installation](#Installation)
2. [Features](#Features)
3. [Usage](#Usage)
4. [Visual Description](#Visual-Description)
5. [Contributors](#Contributing)
6. [Questions](#Questions)
7. [License](#License)
  

## Installation <a id="Installation"></a>


A user installs this application by:  

	1. Cloning the eCommerce Backend Code (ebuy-backend)  

	2. Installing Node.js  

	3. Installing Express.js 
 
 	4. Installing MySQL  

	5. Installing Seqelize  

 	6. Creating the database from the sql file in the db folder at the MySQL prompt  

   	7. Running the seed files by typing npm run seeds in the terminal

Note:  The package.json file contains all of the packages needed.  Running npm i in the terminal will load all the necessary packages.
  

## Features <a id="Features"></a>

 - Ability to connect to a MySQL database
 - API routes to perform CRUD operations on the tables within the ecommerce_db.  
 - The tables included in the database with associated routes are:  
	- categories  
  	- products  
  	- tags
- API routes for all tables include:
	- GET all records from the table
 	- GET a single record from the table
  	- POST a new item into the table
  	- PUT to update a specific item
  	- DELETE to remove an item from the table
  

## Usage <a id="Usage"></a>

This application is intended to be used to connect an eCommerce frontend to a MySQL database. This application allows a developer to create a frontend that allows a user to create, render, update and delete items within their ecommerce store.
  

## Visual Description <a id="Visual-Description"></a>

A visual representation of the working backend application may be seen here:  

### User Experience     

![desc](assets/images/enduserinput.png)  

### Required Package Files:  

![desc](assets/images/requiredfiles.png)  

### Required Answers:  

![desc](assets/images/requiredans.png)  

### Logic for writing Images:  

![desc](assets/images/writeimageslogic.png)  

### When Functions:  

![desc](assets/images/whenfunctions.png)  


## Contributors <a id="Contributing"></a>

Any user can create a branch, commit their changes and create a pull request to be reviewed. All contributions are welcome!
  

## Tests <a id="Tests"></a>

Tests can be performed by downloading the application, installing the node_modules, running the seeds and then performing the basic CRUD functions via Insomnia or Postman after initiating the database via npm start from the terminal.
  

## Questions  <a id="Questions"></a>

Questions can be directed to maureen.business@gmail.com or submitted via my Github account at [https://github.com/Moebirdie/Inquirer-README-Generator](https://github.com/Moebirdie/Inquirer-README-Generator).
  

## License <a id="License"></a>

[MIT](https://opensource.org/licenses/MIT)
