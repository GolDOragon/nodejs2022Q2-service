import { MigrationInterface, QueryRunner } from "typeorm";

export class JointTable1659275609651 implements MigrationInterface {
    name = 'JointTable1659275609651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" ADD "artistId" uuid`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "UQ_0b7b9c184c74b5d0ae32796c62d" UNIQUE ("artistId")`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD "albumId" uuid`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "UQ_4d3e1db289b90223ee9aa3835ae" UNIQUE ("albumId")`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD "trackId" uuid`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "UQ_a1aa0ad0d3036ae303984b553d7" UNIQUE ("trackId")`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_0b7b9c184c74b5d0ae32796c62d" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_4d3e1db289b90223ee9aa3835ae" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_a1aa0ad0d3036ae303984b553d7" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_a1aa0ad0d3036ae303984b553d7"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_4d3e1db289b90223ee9aa3835ae"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_0b7b9c184c74b5d0ae32796c62d"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "UQ_a1aa0ad0d3036ae303984b553d7"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP COLUMN "trackId"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "UQ_4d3e1db289b90223ee9aa3835ae"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP COLUMN "albumId"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "UQ_0b7b9c184c74b5d0ae32796c62d"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP COLUMN "artistId"`);
    }

}
