import { IsOptional, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  @IsOptional()
  artistId: string | null;

  @IsString()
  @IsOptional()
  trackId: string | null;

  @IsString()
  @IsOptional()
  albumId: string | null;
}
