import { MigrationInterface, QueryRunner } from "typeorm";

export class CourseUsernameRename1637464140864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log("Debug: queryRunner in CourseUsernameRename");
    console.log(queryRunner);
    await queryRunner.query(`ALTER TABLE course CHANGE creator_id user_id int`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE course CHANGE user_id creator_id int;`);
  }
}
