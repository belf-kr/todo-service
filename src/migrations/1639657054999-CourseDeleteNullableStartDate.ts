import { MigrationInterface, QueryRunner } from "typeorm";

export class CourseDeleteNullableStartDate1639657054999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`USE belf;`);
    await queryRunner.query(`DELETE FROM course WHERE start_date IS NULL`);
    await queryRunner.query(`ALTER TABLE course MODIFY start_date DATE NOT NULL;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`USE belf;`);
    await queryRunner.query(`ALTER TABLE course MODIFY start_date DATE NULL;`);
  }
}
