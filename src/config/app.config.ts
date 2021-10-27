import DatabaseConfig from "./database.config";

export default () => ({
  port: parseInt(process.env.TODO_SERVICE_SERVER_PORT),
  database: {
    ...DatabaseConfig(),
  },
});
