const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '18221867',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'backend'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};