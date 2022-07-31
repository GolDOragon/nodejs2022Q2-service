import { MigrationInterface, QueryRunner } from "typeorm";

export class Artist1659264416065 implements MigrationInterface {
    name = 'Artist1659264416065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" ADD "grammy" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "grammy"`);
    }

}
