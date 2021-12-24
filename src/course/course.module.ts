import { forwardRef, HttpModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";

import { Course } from "src/entity/course.entity";

import { TagModule } from "src/tag/tag.module";

import { CourseTagModule } from "src/course-tag/course-tag.module";

import { ColorModule } from "src/color/color.module";

import { CourseImportationModule } from "src/course-importation/course-importation.module";
import { WorkTodoModule } from "src/work-todo/work-todo.module";

import { WorkDoneModule } from "src/work-done/work-done.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { K8sServiceDNS } from "src/common/lib/service";
import { OAuthApiClient } from "src/common/lib/oauth-api";

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: K8sServiceDNS("oauth-server", configService.get("SERVER_PORT_OAUTH")),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Course]),
    TagModule,
    CourseTagModule,
    ColorModule,
    forwardRef(() => CourseImportationModule),
    forwardRef(() => WorkTodoModule),
    WorkDoneModule,
  ],
  providers: [CourseService, OAuthApiClient],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule {}
