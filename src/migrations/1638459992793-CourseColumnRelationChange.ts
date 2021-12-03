import { MigrationInterface, QueryRunner } from "typeorm";

export class CourseColumnRelationChange1638459992793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 외래키 index 구하기
    await queryRunner.query(`USE information_schema;`);
    await queryRunner.query(`SET @foreign_key_index =
    (
      SELECT CONSTRAINT_NAME
      FROM KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = 'belf'
      AND TABLE_NAME = 'course'
      AND COLUMN_NAME = 'original_course_id'
      AND POSITION_IN_UNIQUE_CONSTRAINT IS NOT NULL
      );`);

    // Unique index 구하기
    await queryRunner.query(`USE information_schema;`);
    await queryRunner.query(`SET @unique_index =
    (
        SELECT CONSTRAINT_NAME
        FROM KEY_COLUMN_USAGE
        WHERE TABLE_SCHEMA = 'belf'
          AND TABLE_NAME = 'course'
          AND COLUMN_NAME = 'original_course_id'
          AND POSITION_IN_UNIQUE_CONSTRAINT IS NULL
    );`);

    // 외래키 삭제
    await queryRunner.query(`USE belf`);
    await queryRunner.query(`SET @queryStr = CONCAT('ALTER TABLE course DROP FOREIGN KEY ', @foreign_key_index);`);
    await queryRunner.query(`PREPARE qry from @queryStr;`);
    await queryRunner.query(`EXECUTE qry;`);

    // Unique 삭제
    await queryRunner.query(`SET @queryStr = CONCAT('DROP INDEX ', @unique_index);`);
    await queryRunner.query(`SET @querystr = CONCAT(@queryStr, ' ON course');`);
    await queryRunner.query(`PREPARE qry from @queryStr;`);
    await queryRunner.query(`EXECUTE qry;`);
    await queryRunner.query(`SELECT @querystr;`);

    // 외래키 재생성
    await queryRunner.query(`SET @querystr = CONCAT('ALTER TABLE course ADD CONSTRAINT ', @foreign_key_index);`);
    await queryRunner.query(`SET @querystr = CONCAT(@querystr, ' FOREIGN KEY (original_course_id) REFERENCES course (id)');`);
    await queryRunner.query(`PREPARE qry from @queryStr;`);
    await queryRunner.query(`EXECUTE qry;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`USE belf`);
    await queryRunner.query(`ALTER TABLE course ADD UNIQUE KEY (original_course_id);`);
  }
}
