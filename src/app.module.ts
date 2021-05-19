import { Module } from "@nestjs/common";
import { getConnectionToken, TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: "localConnection",
      type: "mysql",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      replication: {
        master: {
          host: "localhost",
          port: 3306,
          username: "root",
          password: "example",
          database: "belf",
        },
        slaves: [
          {
            host: "localhost",
            port: 3306,
            username: "root",
            password: "example",
            database: "belf",
          },
        ],
      },
    }),
    TypeOrmModule.forRoot({
      name: "qaConnection",
      type: "mysql",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      replication: {
        master: {
          host: "localhost",
          port: 3306,
          username: "root",
          password: "example",
          database: "belf",
        },
        slaves: [
          {
            host: "localhost",
            port: 3306,
            username: "root",
            password: "example",
            database: "belf",
          },
        ],
      },
    }),
    TypeOrmModule.forRoot({
      name: "serviceConnection",
      type: "mysql",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      replication: {
        master: {
          host: "localhost",
          port: 3306,
          username: "root",
          password: "example",
          database: "belf",
        },
        slaves: [
          {
            host: "localhost",
            port: 3306,
            username: "root",
            password: "example",
            database: "belf",
          },
        ],
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useFactory: (qaConnection: Connection) => {
        return new AppService(qaConnection);
      },
      inject: [getConnectionToken("localConnection")],
    },
  ],
})
export class AppModule {}
