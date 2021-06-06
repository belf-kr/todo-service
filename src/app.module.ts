import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConnectionOptions } from "typeorm";
import * as Joi from "joi";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { ExampleUpperModule } from "./example-upper/example-upper.module";
import { ExampleLowerModule } from "./example-lower/example-lower.module";

import AppConfig from "./config/app.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      load: [AppConfig],
      // prod 환경의 환경변수는 모두 k8s가 컨트롤
      ignoreEnvFile: process.env.NODE_ENV === "production",
      envFilePath: process.env.NODE_ENV === "development" ? ".env.dev" : "",
      validationSchema: Joi.object({
        DB_MASTER_HOST: Joi.string().required(),
        DB_MASTER_PORT: Joi.number().required(),
        DB_MASTER_USERNAME: Joi.string().required(),
        DB_MASTER_PASSWORD: Joi.string().required(),
        DB_MASTER_DATABASE: Joi.string().required(),
        DB_SLAVE_HOST: Joi.string().required(),
        DB_SLAVE_PORT: Joi.number().required(),
        DB_SLAVE_USERNAME: Joi.string().required(),
        DB_SLAVE_PASSWORD: Joi.string().required(),
        DB_SLAVE_DATABASE: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get<ConnectionOptions>("database");
      },
      inject: [ConfigService],
    }),
    ExampleUpperModule,
    ExampleLowerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
