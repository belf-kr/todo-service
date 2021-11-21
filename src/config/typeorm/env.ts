import dotenv = require("dotenv");
import path = require("path");

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV == "development" ? ".env.dev" : ""),
});
