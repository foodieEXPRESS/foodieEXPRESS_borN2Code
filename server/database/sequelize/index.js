const config = require("./config.js");
const { Sequelize, DataTypes } = require("sequelize");

// create a database connection in your application using a Sequelize instance and the config file
const connection = new Sequelize(
  "hello_world_db",
  "DATABASE_USERNAME",
  "DATABASE_PASSWORD",
  {
    host: "host_name",
    dialect: "mysql",
  }
);

//verify your connection here !
connection.authenticate();

//  create your table using sequilize
const TableName = connection.define("phrases", {
 
});

// this call, Sequelize will automatically perform an SQL query to the database and create a table, printing the message phrase table created successfully!.
// please run this below *****one time***** after creating your connection

connection
  .sync({ force: true })
  .then(() => {
    console.log("phrase table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

// export your Model Phrase below