/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: ["dist/**/*/model.js"],
  migrations: ["dist/migration/**/*.migration.js"],
  subscribers: ["dist/subscriber/**/*.subscriber.js"],
};

// host: process.env.DATABASE_HOST,
// port: process.env.DATABASE_PORT,
// username: process.env.DATABASE_USERNAME,
// password: process.env.DATABASE_PASSWORD,
// database: process.env.DATABASE_NAME,
