import { MigrationInterface, QueryRunner } from "typeorm";

export class ManyToOneRelation1659282854955 implements MigrationInterface {
    name = 'ManyToOneRelation1659282854955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`ALTER TABLE "track" ADD "artistId" uuid`);
        await queryRunner.query(`ALTER TABLE "track" ADD "albumId" uuid`);
        await queryRunner.query(`ALTER TABLE "track" ADD "favoriteId" uuid`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "UQ_3fe48e88867570a3509868a7645" UNIQUE ("favoriteId")`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_3fe48e88867570a3509868a7645" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_3fe48e88867570a3509868a7645"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "UQ_3fe48e88867570a3509868a7645"`);
        await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "favoriteId"`);
        await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "albumId"`);
        await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "artistId"`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
