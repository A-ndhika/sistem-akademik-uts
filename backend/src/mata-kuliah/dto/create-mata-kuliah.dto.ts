import { IsString, IsNumber, Length } from 'class-validator';

export class CreateMataKuliahDto {
  @IsString()
  @Length(5, 10)
  kode: string;

  @IsString()
  nama: string;

  @IsNumber()
  sks: number;

  @IsString()
  semester: string;

  @IsString()
  jurusan: string;
}
