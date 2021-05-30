import { ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";

import DbConfig from "./database.config";

dotenv.config();

const typeormConfig = DbConfig() as ConnectionOptions;

export default typeormConfig;
