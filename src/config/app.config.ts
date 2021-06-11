import DatabaseConfig from "./database.config";

export default () => ({
  port: parseInt(process.env.SERVER_PORT),
  database: {
    ...DatabaseConfig(),
  },
});
