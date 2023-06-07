//file to connect to Postgres
const { Pool } = require("pg");

const pool = new Pool(); //no need to define variables, as it was defined in .env

module.exports = {
    query: (text, params) => pool.query(text, params),
}

