const DatabaseConfig = () => ({
  type: "mysql",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: Boolean(process.env.DB_SYNCHRONIZE),
  migrationsTableName: "typeorm_migrations",
  migrations: ["dist/src/migrations/*{.ts,.js}"],
  cli: {
    migrationsDir: "src/migrations",
  },
  replication: {
    master: {
      host: process.env.DB_MASTER_HOST,
      port: parseInt(process.env.DB_MASTER_PORT),
      username: process.env.DB_MASTER_USERNAME,
      password: process.env.DB_MASTER_PASSWORD,
      database: process.env.DB_MASTER_DATABASE,
    },
    slaves: [
      {
        host: process.env.DB_SLAVE_HOST,
        port: parseInt(process.env.DB_SLAVE_PORT),
        username: process.env.DB_SLAVE_USERNAME,
        password: process.env.DB_SLAVE_PASSWORD,
        database: process.env.DB_SLAVE_DATABASE,
      },
    ],
  },
});

export default DatabaseConfig;
