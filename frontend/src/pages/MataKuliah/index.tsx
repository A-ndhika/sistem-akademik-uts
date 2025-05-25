import { Outlet, useNavigate } from 'react-router-dom';

export default function MataKuliahLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manajemen Mata Kuliah</h1>
        <button
          onClick={() => navigate('/matakuliah/new')}
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow"
        >
          Tambah Mata Kuliah
        </button>
      </div>
      <Outlet />
    </div>
  );
}
