const DatabaseConfig = () => ({
  type: "mysql",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: process.env.DB_SYNCHRONIZE || false,
  migrationsTableName: "migrations",
  migrations: ["dist/src/migrations/*{.ts,.js}"],
  cli: {
    migrationsDir: "src/migrations",
  },
  replication: {
    master: {
      host: process.env.DB_MASTER_HOST || "localhost",
      port: parseInt(process.env.DB_MASTER_PORT) || 3306,
      username: process.env.DB_MASTER_USERNAME || "root",
      password: process.env.DB_MASTER_PASSWORD || "example",
      database: process.env.DB_MASTER_DATABASE || "belf",
    },
    slaves: [
      {
        host: process.env.DB_SLAVE_HOST || "localhost",
        port: parseInt(process.env.DB_SLAVE_PORT) || 3307,
        username: process.env.DB_SLAVE_USERNAME || "root",
        password: process.env.DB_SLAVE_PASSWORD || "example",
        database: process.env.DB_SLAVE_DATABASE || "belf",
      },
    ],
  },
});

export default DatabaseConfig;
