import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTodoTable1644959839779 implements MigrationInterface {
    name = 'CreateTodoTable1644959839779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "body" varchar NOT NULL, "isDone" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "todo"`);
    }

}
