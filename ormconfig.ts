module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "example",
  database: "belf",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
};
