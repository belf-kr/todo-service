import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkTodoAddFKConstraint1639667174402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`USE belf;`);
    await queryRunner.query(`DELETE FROM work_todo WHERE course_id IS NULL`);
    await queryRunner.query(`ALTER TABLE work_todo MODIFY course_id INT NOT NULL;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`USE belf;`);
    await queryRunner.query(`ALTER TABLE work_todo MODIFY course_id INT NULL;`);
  }
}
