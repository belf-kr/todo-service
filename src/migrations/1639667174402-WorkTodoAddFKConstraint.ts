import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkTodoAddFKConstraint1639667174402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`USE belf;`);
    await queryRunner.query(`DELETE FROM work_todo WHERE course_id IS NULL`);

    // FK 제약조건 삭제
    // 외래키 index 구하기
    await queryRunner.query(`USE information_schema;`);
    await queryRunner.query(`SET @foreign_key_index =
    (
      SELECT CONSTRAINT_NAME
      FROM KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = 'belf'
      AND TABLE_NAME = 'work_todo'
      AND COLUMN_NAME = 'course_id'
      );`);

    // 외래키 삭제
    await queryRunner.query(`USE belf`);
    await queryRunner.query(`SET @queryStr = CONCAT('ALTER TABLE work_todo DROP FOREIGN KEY ', @foreign_key_index);`);
    await queryRunner.query(`PREPARE qry from @queryStr;`);
    await queryRunner.query(`EXECUTE qry;`);

    // 외래키 재생성
    await queryRunner.query(`SET @querystr = CONCAT('ALTER TABLE work_todo ADD CONSTRAINT ', @foreign_key_index);`);
    await queryRunner.query(`SET @querystr = CONCAT(@querystr, ' FOREIGN KEY (course_id) REFERENCES course (id) ON DELETE CASCADE');`);
    await queryRunner.query(`PREPARE qry from @queryStr;`);
    await queryRunner.query(`EXECUTE qry;`);

    await queryRunner.query(`USE belf;`);
    await queryRunner.query(`ALTER TABLE work_todo MODIFY course_id INT NOT NULL;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // FK 제약조건 삭제
    // 외래키 index 구하기
    await queryRunner.query(`USE information_schema;`);
    await queryRunner.query(`SET @foreign_key_index =
    (
      SELECT CONSTRAINT_NAME
      FROM KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = 'belf'
      AND TABLE_NAME = 'work_todo'
      AND COLUMN_NAME = 'course_id'
      );`);

    // 외래키 삭제
    await queryRunner.query(`USE belf`);
    await queryRunner.query(`SET @queryStr = CONCAT('ALTER TABLE work_todo DROP FOREIGN KEY ', @foreign_key_index);`);
    await queryRunner.query(`PREPARE qry from @queryStr;`);
    await queryRunner.query(`EXECUTE qry;`);

    // 외래키 재생성
    await queryRunner.query(`SET @querystr = CONCAT('ALTER TABLE work_todo ADD CONSTRAINT ', @foreign_key_index);`);
    await queryRunner.query(`SET @querystr = CONCAT(@querystr, ' FOREIGN KEY (course_id) REFERENCES course (id) ON DELETE SET NULL');`);
    await queryRunner.query(`PREPARE qry from @queryStr;`);
    await queryRunner.query(`EXECUTE qry;`);

    await queryRunner.query(`USE belf;`);
    await queryRunner.query(`ALTER TABLE work_todo MODIFY course_id INT NULL;`);
  }
}
