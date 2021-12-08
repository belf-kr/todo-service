import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConnectionOptions } from "typeorm";
import { APP_INTERCEPTOR } from "@nestjs/core";
import Joi = require("joi");

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import AppConfig from "./config/app.config";

import { LoggingInterceptor } from "./interceptor/logging.interceptor";

import { ColorModule } from "./color/color.module";
import { CourseModule } from "./course/course.module";
import { TagModule } from "./tag/tag.module";
import { CourseTagModule } from "./course-tag/course-tag.module";
import { WorkTodoModule } from "./work-todo/work-todo.module";
import { RepeatedDaysOfTheWeekModule } from "./repeated-days-of-the-week/repeated-days-of-the-week.module";
import { WorkDoneModule } from "./work-done/work-done.module";
import { CourseImportationModule } from "./course-importation/course-importation.module";

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
        DB_MASTER_PORT: Joi.number().required().default(3306),
        DB_MASTER_USERNAME: Joi.string().required(),
        DB_MASTER_PASSWORD: Joi.string().allow("").required(),
        DB_MASTER_DATABASE: Joi.string().required().default("belf"),
        DB_SLAVE_HOST: Joi.string().required(),
        DB_SLAVE_PORT: Joi.number().required().default(3306),
        DB_SLAVE_USERNAME: Joi.string().required(),
        DB_SLAVE_PASSWORD: Joi.string().allow("").required(),
        DB_SLAVE_DATABASE: Joi.string().required().default("belf"),
        DB_SYNCHRONIZE: Joi.boolean().default(false),
        SERVER_PORT: Joi.number().default(3000),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get<ConnectionOptions>("database");
      },
      inject: [ConfigService],
    }),
    ColorModule,
    CourseModule,
    TagModule,
    CourseTagModule,
    WorkTodoModule,
    RepeatedDaysOfTheWeekModule,
    WorkDoneModule,
    CourseImportationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
