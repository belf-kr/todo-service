module.exports = {
  type: "mysql",
  host: process.env.DB_MASTER_HOST,
  port: parseInt(process.env.DB_MASTER_PORT),
  username: process.env.DB_MASTER_USERNAME,
  password: process.env.DB_MASTER_PASSWORD,
  database: process.env.DB_MASTER_DATABASE,
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
};
