import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConnectionOptions } from "typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { TagModule } from "./tag/tag.module";
import { ExampleUpperModule } from "./example-upper/example-upper.module";

import AppConfig from "./config/app.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      load: [AppConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get<ConnectionOptions>("database");
      },
      inject: [ConfigService],
    }),
    TagModule,
    ExampleUpperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
