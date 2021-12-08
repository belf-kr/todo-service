import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkDoneSchemaModify1638951784430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`use belf;`);
    queryRunner.query(`DELETE FROM work_done WHERE action_date IS NULL;`);
    queryRunner.query(`ALTER TABLE work_done MODIFY COLUMN action_date DATETIME(6) NOT NULL;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query("use belf;");
    queryRunner.query(`ALTER TABLE work_done MODIFY COLUMN DATETIME(6)`);
  }
}
