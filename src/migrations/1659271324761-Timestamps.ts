import { MigrationInterface, QueryRunner } from "typeorm";

export class Timestamps1659271324761 implements MigrationInterface {
    name = 'Timestamps1659271324761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "album" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "album" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "track" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "track" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
