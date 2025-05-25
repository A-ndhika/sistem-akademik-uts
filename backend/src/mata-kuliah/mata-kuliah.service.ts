import { Injectable } from '@nestjs/common';
import { CreateMataKuliahDto } from './dto/create-mata-kuliah.dto';
import { UpdateMataKuliahDto } from './dto/update-mata-kuliah.dto';

export type MataKuliah = {
  kode: string;
  nama: string;
  sks: number;
  semester: string;
  jurusan: string;
};

@Injectable()
export class MataKuliahService {
  private data: MataKuliah[] = [];

  create(dto: CreateMataKuliahDto): MataKuliah {
    const existing = this.data.find((m) => m.kode === dto.kode);
    if (existing) {
      throw new Error(`Mata kuliah dengan kode ${dto.kode} sudah ada`);
    }

    const newMk: MataKuliah = {
      kode: dto.kode,
      nama: dto.nama,
      sks: dto.sks,
      semester: dto.semester,
      jurusan: dto.jurusan,
    };
    this.data.push(newMk);
    return newMk;
  }

  findAll(): MataKuliah[] {
    return this.data;
  }

  findOne(kode: string): MataKuliah | undefined {
    return this.data.find((m) => m.kode === kode);
  }

  update(kode: string, dto: UpdateMataKuliahDto): MataKuliah | null {
    const index = this.data.findIndex((m) => m.kode === kode);
    if (index === -1) return null;

    const updated: MataKuliah = {
      kode: dto.kode ?? this.data[index].kode,
      nama: dto.nama ?? this.data[index].nama,
      sks: dto.sks ?? this.data[index].sks,
      semester: dto.semester ?? this.data[index].semester,
      jurusan: dto.jurusan ?? this.data[index].jurusan,
    };

    this.data[index] = updated;
    return updated;
  }

  remove(kode: string): MataKuliah | null {
    const index = this.data.findIndex((m) => m.kode === kode);
    if (index === -1) return null;

    const deleted = this.data[index];
    this.data.splice(index, 1);
    return deleted;
  }
}
