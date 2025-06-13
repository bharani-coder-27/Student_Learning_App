import mysql, { createConnection } from 'mysql2';

const db=createConnection({
  host: "localhost",
  user: "root",
  password: "Bharani@2324",
  database: "student_learning_app"
});

export default db;