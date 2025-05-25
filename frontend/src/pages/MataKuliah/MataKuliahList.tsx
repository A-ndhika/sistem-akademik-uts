import { useEffect, useState } from 'react';
import { MataKuliahType } from '@/types/MataKuliah';
import { getMataKuliah, deleteMataKuliah } from '@/services/api';
import { useNavigate } from 'react-router-dom';

export default function MataKuliahList() {
  const [data, setData] = useState<MataKuliahType[]>([]);
  const navigate = useNavigate();

  const fetchData = () => {
    getMataKuliah()
      .then((res) => setData(res.data))
      .catch(() => alert('Gagal mengambil data'));
  };

  const handleDelete = async (kode: string) => {
    if (!confirm(`Hapus mata kuliah ${kode}?`)) return;
    await deleteMataKuliah(kode);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto rounded shadow border bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-2 border">Kode</th>
            <th className="px-4 py-2 border">Nama</th>
            <th className="px-4 py-2 border">SKS</th>
            <th className="px-4 py-2 border">Semester</th>
            <th className="px-4 py-2 border">Jurusan</th>
            <th className="px-4 py-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((mk) => (
            <tr key={mk.kode}>
              <td className="px-4 py-2 border">{mk.kode}</td>
              <td className="px-4 py-2 border">{mk.nama}</td>
              <td className="px-4 py-2 border">{mk.sks}</td>
              <td className="px-4 py-2 border">{mk.semester}</td>
              <td className="px-4 py-2 border">{mk.jurusan}</td>
              <td className="px-4 py-2 border space-x-2">
                <button
                  onClick={() => navigate(`/matakuliah/edit/${mk.kode}`)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(mk.kode)}
                  className="text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
