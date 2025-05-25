import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createMataKuliah,
  getMataKuliahByKode,
  updateMataKuliah,
} from '@/services/api';
import { MataKuliahType } from '@/types/MataKuliah';

const initial: MataKuliahType = {
  kode: '',
  nama: '',
  sks: 2,
  semester: '',
  jurusan: '',
};

export default function MataKuliahForm() {
  const [form, setForm] = useState<MataKuliahType>(initial);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { kode } = useParams();

  useEffect(() => {
    if (kode) {
      getMataKuliahByKode(kode)
        .then((res) => setForm(res.data))
        .catch(() => alert('Gagal mengambil data untuk edit'));
    }
  }, [kode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'sks' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (kode) {
        await updateMataKuliah(kode, form);
      } else {
        await createMataKuliah(form);
      }
      navigate('/matakuliah');
    } catch (err) {
      alert('Gagal menyimpan data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 bg-white p-6 rounded shadow max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-2">{kode ? 'Edit' : 'Tambah'} Mata Kuliah</h2>

      <input name="kode" placeholder="Kode" value={form.kode} onChange={handleChange} required disabled={!!kode} className="border px-3 py-2 rounded" />
      <input name="nama" placeholder="Nama" value={form.nama} onChange={handleChange} required className="border px-3 py-2 rounded" />
      <input name="sks" type="number" placeholder="SKS" value={form.sks} onChange={handleChange} required className="border px-3 py-2 rounded" />
      <input name="semester" placeholder="Semester" value={form.semester} onChange={handleChange} required className="border px-3 py-2 rounded" />
      <input name="jurusan" placeholder="Jurusan" value={form.jurusan} onChange={handleChange} required className="border px-3 py-2 rounded" />

      <div className="flex justify-between mt-4">
        <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-6 py-2 rounded">
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
        <button type="button" onClick={() => navigate('/matakuliah')} className="text-gray-500 hover:underline">
          Batal
        </button>
      </div>
    </form>
  );
}
