const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const { conn } = require ('./db')
const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(router);

const PORT = process.env.PORT || 5000;

server.listen(PORT,async () => {
 await conn.sync({force:false})
  console.log(`Server is running on port ${PORT}`);
});