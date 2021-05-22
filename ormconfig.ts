module.exports = {
  type: "mysql",
  host: process.env.DB_MASTER_HOST || "localhost",
  port: parseInt(process.env.DB_MASTER_PORT) || 3306,
  username: process.env.DB_MASTER_USERNAME || "root",
  password: process.env.DB_MASTER_PASSWORD || "example",
  database: process.env.DB_MASTER_DATABASE || "belf",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
};
