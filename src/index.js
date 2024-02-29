const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const server = express();
server.use(cors());
const port = 4000;
server.use(express.json());

async function getDB() {
  const dataBase = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'r00t',
    database: 'music',
  });
  await dataBase.connect();
  return dataBase;
}

server.listen(port, () => {
  console.log(`El servidor se esta ejecutando en el puerto ${port}`);
});



const staticServer = './public-react';
server.use(express.static(staticServer));
