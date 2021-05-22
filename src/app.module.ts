import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TagModule } from "./tag/tag.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: `.env`
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "mysql",
        host: process.env.DB_MASTER_HOST,
        port: parseInt(process.env.DB_MASTER_PORT),
        username: process.env.DB_MASTER_USERNAME,
        password: process.env.DB_MASTER_PASSWORD,
        database: process.env.DB_MASTER_DATABASE,
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
      }),
    }),
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
