import { ConnectionOptions } from "typeorm";
import "./env";

import DbConfig from "../database.config";

/**
 * 실제 코드에서는 사용되지 않으며 package.json의 script를 통해 안전하게 마이그레이션을 진행하기 위하여 사용됩니다.
 * nestjs와 독립적으로 실행되기 떄문에 따로 추가적으로 환경변수를 주입받기 위해서 dotenv를 사용합니다.
 */

console.log("Debug: Let's see typeormConfig in typeorm.config.ts!!!");
const typeormConfig = DbConfig() as ConnectionOptions;
console.log(typeormConfig);
console.log("Debug end: typeormConfig end!");

export default typeormConfig;
