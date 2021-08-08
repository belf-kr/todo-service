import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { File } from "./file.entity";

@Entity({})
export class User {
  constructor(
    id?: number,
    profilePicture?: File,
    email?: string,
    introduction?: string,
    lastConnectedIp?: string,
    lastConnectedTime?: Date,
    password?: string,
    isAuth?: boolean,
    isUsingOAuth?: boolean
  ) {
    if (id) {
      this.id = id;
    }
    if (profilePicture && profilePicture.id !== undefined) {
      this.profilePicture = profilePicture;
    }
    if (email) {
      this.email = email;
    }
    if (introduction) {
      this.introduction = introduction;
    }
    if (lastConnectedIp) {
      this.lastConnectedIp = lastConnectedIp;
    }
    if (lastConnectedTime) {
      this.lastConnectedTime = lastConnectedTime;
    }
    if (password) {
      this.password = password;
    }
    if (isAuth) {
      this.isAuth = isAuth;
    }
    if (isUsingOAuth) {
      this.isUsingOAuth = isUsingOAuth;
    }
  }

  @PrimaryGeneratedColumn({})
  id: number;

  @OneToOne(() => File, {
    onDelete: "SET NULL",
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: "profile_picture" })
  profilePicture: File;

  @Column({
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    length: 30,
    type: "nvarchar",
    charset: "utf8mb4",
    unique: true,
  })
  nickname: string;

  @Column({
    type: "text",
    charset: "utf8mb4",
    nullable: true,
  })
  introduction: string;

  @Column({
    length: 15,
    type: "char",
    nullable: true,
    name: "last_connected_ip",
  })
  lastConnectedIp: string;

  @UpdateDateColumn({
    type: "datetime",
    nullable: true,
    name: "last_connected_time",
  })
  lastConnectedTime: Date;

  @Column({
    length: 64,
    type: "varchar",
  })
  password: string;

  @Column({
    type: "boolean",
    default: false,
    name: "is_auth",
  })
  isAuth: boolean;

  @Column({
    type: "boolean",
    default: false,
    name: "is_using_oauth",
  })
  isUsingOAuth: boolean;
}
