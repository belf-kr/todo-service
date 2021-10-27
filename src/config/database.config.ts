const DatabaseConfig = () => ({
  type: "mysql",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: Boolean(process.env.TODO_SERVICE_DB_SYNCHRONIZE),
  migrationsTableName: "migrations",
  migrations: ["dist/src/migrations/*{.ts,.js}"],
  cli: {
    migrationsDir: "src/migrations",
  },
  replication: {
    master: {
      host: process.env.TODO_SERVICE_DB_MASTER_HOST,
      port: parseInt(process.env.TODO_SERVICE_DB_MASTER_PORT),
      username: process.env.TODO_SERVICE_DB_MASTER_USERNAME,
      password: process.env.TODO_SERVICE_DB_MASTER_PASSWORD,
      database: process.env.TODO_SERVICE_DB_MASTER_DATABASE,
    },
    slaves: [
      {
        host: process.env.TODO_SERVICE_DB_SLAVE_HOST,
        port: parseInt(process.env.TODO_SERVICE_DB_SLAVE_PORT),
        username: process.env.TODO_SERVICE_DB_SLAVE_USERNAME,
        password: process.env.TODO_SERVICE_DB_SLAVE_PASSWORD,
        database: process.env.TODO_SERVICE_DB_SLAVE_DATABASE,
      },
    ],
  },
});

export default DatabaseConfig;
