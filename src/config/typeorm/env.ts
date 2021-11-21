import dotenv = require("dotenv");
import path = require("path");

console.log("Debug: This is env.ts file imported context");
dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV == "development" ? ".env.dev" : ""),
});
console.log("Debug end: env.ts finished");
