export class MataKuliah {
  constructor(
    public kode: string,
    public nama: string,
    public sks: number,
    public semester: string,
    public jurusan: string,
  ) {}

  getLabel(): string {
    return `${this.kode} - ${this.nama}`;
  }
}
