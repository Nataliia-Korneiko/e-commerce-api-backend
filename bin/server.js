const app = require('../app');
const db = require('../db');
require('dotenv').config();

const { PORT = 8080 } = process.env;

db.then(() => {
  app.listen(PORT, async () => {
    console.log(`Server is running. Use our API on the port: ${PORT}`);
  });
}).catch((error) => {
  console.log(`Server is not running. Error message: ${error.message}`);
  process.exit(1);
});
