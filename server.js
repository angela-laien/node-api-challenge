const express = require("express");
const helmet = require('helmet');

const actionRouter = require("./data/routers/actionRouter.js")
const projectRouter = require("./data/routers/projectRouter.js")

const server = express();
// middleware
server.use(logger);
server.use(helmet());
server.use(express.json());
// endpoints
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get('/', (req, res) => {
    const nameInsert = req.name ? ` ${req.name}` : "";
    res.send(
        `<h2>Welcome${nameInsert} to the API</h2>
        `);
});
// custom middleware
function logger(req, res, next) {
    console.log(`${req.method} Request to ${req.originalUrl}`);
  
    next();
}
  
module.exports = server;


